import React from 'react';
import VirtualList from "../templates/virtual-list";
import FullScreen from "../templates/fullscreen";
import {FlexBox, FlexScroll} from "../templates/flex";
import {Field, Form} from "../templates/form";
import {DB} from "../features/firebase";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import FabRightBottom from "./fab-right-bottom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";


export default class DBVirtualList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: false, index: 0, open: false, isAdd: false, item: {}};
        this.onClose = this.onClose.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onFilter = this.onFilter.bind(this);

        this.dbpath = this.props.dbpath;
    }

    onClose() {
        this.setState({open: false})
    }

    onFilter({target: {value: term}}) {
        this.DB.filter(term);
        this.setState({term})
    }

    onCreate() {
        this.setState({open: true, isAdd: true, item: {}})
    }

    onEdit(item) {
        this.setState({open: true, isAdd: false, item})
    }

    componentDidMount() {
        this.DB = DB(this.dbpath, ({data, index}) => this.setState({data, index, modified: new Date()}));
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        const {data, modified, index, open, isAdd, item, term} = this.state;
        const {single, fields, template} = this.props;

        if (!data) return <FlexBox center middle><CircularProgress/></FlexBox>;

        if(!term && !open && data.length < 1) return (
            <FlexBox middle center>
                <Button variant="contained" color="secondary" onClick={this.onCreate}><AddIcon/> Создать</Button>
            </FlexBox>
        );

        return (
            <FlexBox>
                <Grid spacing={2} container style={{padding: 8}}>
                    <Grid item xs>
                        {(term || (!single && data.length > 0)) && <TextField onChange={this.onFilter} fullWidth placeholder="Поиск..."/>}
                    </Grid>
                    <Grid item>
                        {!single && <Fab size="small" color="secondary" onClick={this.onCreate}><AddIcon/></Fab>}
                    </Grid>
                </Grid>

                <FullScreen open={open} title={item.title} onClose={this.onClose}>
                    <FlexScroll>
                        <FlexBox middle center>
                            <Form item={item} onSubmit={item => this.onClose(isAdd ? this.DB.add(item) : this.DB.change(item))}>
                                {fields.map(({id, type, title, dbpath, dblabel}) => <Field key={id} id={id} type={type} title={title} dbpath={dbpath} dblabel={dblabel}/>)}
                            </Form>
                        </FlexBox>
                    </FlexScroll>
                    {!isAdd && !single && <FabRightBottom size="small" color="secondary" onClick={() => this.onClose(this.DB.delete(item))}><DeleteForeverIcon/></FabRightBottom>}
                </FullScreen>

                <VirtualList
                    onPull={() => this.DB.load()}
                    data={data}
                    index={index}
                    modified={modified}
                    divider="inset"
                    template={(item) => template(item, () => this.onEdit(item))}
                />
            </FlexBox>
        )
    }
}
