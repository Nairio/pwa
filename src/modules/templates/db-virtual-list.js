import React from 'react';
import VirtualList from "../templates/virtual-list";
import FullScreen from "../templates/fullscreen";
import {FlexBox, FlexScroll} from "../templates/flex";
import {Field, Form} from "../templates/form";
import {DB} from "../features/firebase";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


export default class DBVirtualList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: false, index: 0, open: false, isAdd: false, item: {}};
        this.onClose = this.onClose.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);

        this.DBPath = this.props.DBPath;
    }

    onClose() {
        this.setState({open: false})
    }

    onCreate() {
        this.setState({open: true, isAdd: true, item: {}})
    }

    onEdit(item) {
        this.setState({open: true, isAdd: false, item})
    }

    componentDidMount() {
        this.DB = DB(this.DBPath, ({data, index}) => this.setState({open: false, data, index, modified: new Date()}));
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        const {data, modified, index, open, isAdd, item, term} = this.state;
        const {single, fields, template, createButton, deleteButton} = this.props;
        return (
            <FlexBox>
                {(term || data.length > 1) && (
                    <Grid container spacing={1} alignItems="flex-end" >
                        <Grid item><SearchIcon/></Grid>
                        <Grid item xs style={{paddingRight: 16}}>
                            <TextField onChange={e => (term => {this.DB.filter(term); this.setState({term})})(e.target.value)} fullWidth placeholder="Поиск..."/>
                        </Grid>
                    </Grid>
                )}
                <FullScreen open={open} title={item.title} onClose={this.onClose}>
                    <FlexScroll>
                        <FlexBox middle center>
                            <Form item={item} onSubmit={item => isAdd ? this.DB.add(item) : this.DB.change(item)}>
                                {fields.map(({id, type, title}) => <Field key={id} id={id} type={type} title={title}/>)}
                            </Form>
                        </FlexBox>
                    </FlexScroll>
                    {!isAdd && !single && deleteButton(() => this.DB.delete(item))}
                </FullScreen>
                <VirtualList
                    onPull={() => this.DB.load()}
                    data={data}
                    index={index}
                    modified={modified}
                    divider="inset"
                    template={(item) => template(item, () => this.onEdit(item))}
                />
                {(!single || data.length < 1) && createButton(this.onCreate)}
            </FlexBox>
        )
    }
}
