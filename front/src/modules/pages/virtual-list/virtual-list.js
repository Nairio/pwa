import React from 'react';
import VirtualList from "../../templates/virtual-list";
import FullScreen from "../../templates/fullscreen";
import {FlexBox, FlexScroll} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon  from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import FabRightBottom from "../../templates/fab-right-bottom";
import {Field, Form} from "../../templates/form";
import Search from "../../header/search";


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
        const item = {id: Math.random().toString(16).slice(2)};
        this.setState({open: true, isAdd: true, item})
    }

    onEdit(item) {
        this.setState({open: true, isAdd: false, item})
    }

    onAdd(item) {
        const index = this.state.data.length;
        const data = this.state.data.concat(item);
        this.setState({open: false, data, index});
    }

    onChange(item) {
        const index = this.state.data.findIndex(({id}) => id === item.id);
        const data = this.state.data.map((d) => d.id === item.id ? item : d);
        this.setState({open: false, data, index});
    }

    onDelete(item) {
        if (!window.confirm(`Удалить "${item.title}"?`)) return;
        const index = this.state.data.findIndex(({id}) => id === item.id);
        const data = this.state.data.filter(({id}) => id !== item.id);
        this.setState({open: false, data, index});
    }

    filter(data, term) {
        return data && data.filter(({title, text}) => (title + " " + text).toLowerCase().includes(term.toLowerCase()))
    }

    componentDidMount() {
        fetch("http://localhost:8000/data/").then(res => res.json()).then(data => this.setState({data}))
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
                                    <Field id="id" type="disabled" title="Идентификатор"/>
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
                            <ListItem button alignItems="flex-start">
                                {item.img && <ListItemAvatar><Avatar src={item.img}/></ListItemAvatar>}
                                <ListItemText inset={!item.img} primary={`${item.title} ${item.text}`} secondary={item.id}/>
                                <IconButton onClick={() => this.onEdit(item)}><EditIcon/></IconButton>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FlexBox>
        )
    }
}
