import React from 'react';
import VirtualList from "../../templates/virtual-list";
import FullScreen from "../../templates/fullscreen";
import {FlexBox, FlexScroll} from "../../templates/flex";
import Header from "../../header/header";
import HeaderTitle from "../../header/header-title";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import FabRightBottom from "../../templates/fab-right-bottom";
import {Field, Form} from "../../templates/form";
import Search from "../../header/search";
import {DB} from "../../features/firebase";

export default class Experience extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: false, index: 0, open: false, isAdd: false, item: {}};
        this.onClose = this.onClose.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
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
        this.DB = DB("teacher", ({data, index}) => this.setState({open: false, data, index, modified: new Date()}));
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        const {data, modified, index, open, isAdd, item} = this.state;
        return (
            <FlexBox>
                <Header>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                    <Search onChange={term => this.DB.filter(term)}/>
                    <IconButton color="secondary" onClick={this.onCreate}><AddIcon/></IconButton>
                </Header>
                <FlexBox>
                    <FullScreen open={open} title={item.title} onClose={this.onClose}>
                        <FlexScroll>
                            <FlexBox middle center>
                                <Form item={item} onSubmit={item => isAdd ? this.DB.add(item) : this.DB.change(item)}>
                                    <Field id="img" type="image" title="Иконка"/>
                                    <Field id="_id" type="disabled" title="Идентификатор"/>
                                    <Field id="sort" type="disabled" title="Сортировка"/>
                                    <Field id="title" type="text" title="Название"/>
                                    <Field id="text" type="text" title="Текст"/>
                                </Form>
                            </FlexBox>
                        </FlexScroll>
                        <FabRightBottom size="small" hide={isAdd} color="secondary" onClick={() => this.DB.delete(item)}><DeleteForeverIcon/></FabRightBottom>
                    </FullScreen>
                    <VirtualList
                        onPull={() => this.DB.load()}
                        data={data}
                        index={index}
                        modified={modified}
                        divider="inset"
                        template={(item) => (
                            <ListItem button alignItems="flex-start">
                                {item.img && <ListItemAvatar><Avatar src={item.img}/></ListItemAvatar>}
                                <ListItemText inset={!item.img} primary={`${item.title} ${item.text}`} secondary={item._id}/>
                                <IconButton onClick={() => this.onEdit(item)}><EditIcon/></IconButton>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FlexBox>
        )
    }
}
