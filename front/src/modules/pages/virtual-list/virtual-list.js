import React from 'react';
import VirtualList from "../../templates/virtual-list";
import FullScreen from "../../templates/fullscreen";
import {FlexBox, FlexScroll} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import FabRightBottom from "../../templates/fab-right-bottom";
import {Field, Form} from "../../templates/form";
import Search from "../../header/search";
import {request} from "../../features/request";


export default class VirtualListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: false, term: "", index: 0, open: false, isAdd: false, item: {}};
        this.onClose = this.onClose.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.filter = this.filter.bind(this);
    }

    onClose() {
        this.setState({open: false})
    }

    onSearch(term) {
        const index = 0;
        this.setState({term: term, index});
    }

    onCreate() {
        const item = {_id: Math.random().toString(16).slice(2)};
        this.setState({open: true, isAdd: true, item})
    }

    onEdit(item) {
        this.setState({open: true, isAdd: false, item})
    }

    onAdd(item) {
        item = {...item, added: true};
        const index = this.state.data.length;
        const data = this.state.data.concat(item);
        this.setState({open: false, data, index});

        request("add", {col: "data", item: {...item, added: undefined}}).then(({ok, _id}) => {
            if (ok === 1) {
                delete item.added;
                const index = this.state.data.findIndex(({_id}) => _id === item._id);
                const data = this.state.data.map((d) => d._id === item._id ? {...item, _id} : d);
                this.setState({data, index});
            }
        });
    }

    onChange(item) {
        item = {...item, modified: true};
        const index = this.state.data.findIndex(({_id}) => _id === item._id);
        const data = this.state.data.map((d) => d._id === item._id ? item : d);
        this.setState({open: false, data, index});

        request("change", {col: "data", item: {...item, modified: undefined}}).then(({ok}) => {
            if (ok === 1) {
                delete item.modified;
                const index = this.state.data.findIndex(({_id}) => _id === item._id);
                const data = this.state.data.map((d) => d._id === item._id ? item : d);
                this.setState({data, index});
            }
        });
    }

    onDelete(item) {
        if (!window.confirm(`Удалить "${item.title}"?`)) return;
        item = {...item, deleted: true};
        const index = this.state.data.findIndex(({_id}) => _id === item._id);
        const data = this.state.data.map((d) => d._id === item._id ? item : d);
        this.setState({open: false, data, index});

        request("delete", {col: "data", item: {...item, deleted: undefined}}).then(({ok}) => {
            if (ok === 1) {
                delete item.deleted;
                const index = this.state.data.findIndex(({_id}) => _id === item._id);
                const data = this.state.data.filter(({_id}) => _id !== item._id);
                this.setState({data, index});
            }
        });
    }

    filter(data, term) {
        return data && data.filter(({title, text}) => (title + " " + text).toLowerCase().includes(term.toLowerCase()))
    }

    componentDidMount() {
        request("getAll", {col: "data"}).then(data => this.setState({data}))
    }

    render() {
        const {data, term, index, open, isAdd, item} = this.state;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                    <Search onChange={this.onSearch}/>
                    <FabRightBottom size="small" color="secondary" onClick={this.onCreate}><AddIcon/></FabRightBottom>
                </Header>
                <FlexBox>
                    <FullScreen open={open} title={item.title} onClose={this.onClose}>
                        <FlexScroll>
                            <FlexBox middle center>
                                <Form item={item} onSubmit={item => isAdd ? this.onAdd(item) : this.onChange(item)}>
                                    <Field id="img" type="image" title="Иконка"/>
                                    <Field id="_id" type="disabled" title="Идентификатор"/>
                                    <Field id="title" type="text" title="Название"/>
                                    <Field id="text" type="text" title="Текст"/>
                                </Form>
                            </FlexBox>
                        </FlexScroll>
                        <FabRightBottom size="small" hide={isAdd} color="secondary" onClick={() => this.onDelete(item)}><DeleteForeverIcon/></FabRightBottom>
                    </FullScreen>
                    <VirtualList
                        data={this.filter(data, term)}
                        index={index}
                        divider="inset"
                        template={(item) => (
                            <ListItem button alignItems="flex-start" style={{background: (item.added && "green") || (item.modified && "yellow") || (item.deleted && "red") || "white"}}>
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
