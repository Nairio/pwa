import React from 'react';
import VirtualList from "../../templates/virtual-list";
import FullScreen from "../../templates/fullscreen";
import {FlexBox, FlexScroll} from "../../templates/flex";
import Header from "../../header/header";
import HeaderTitle from "../../header/header-title";
import AddIcon from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import {Field, Form} from "../../templates/form";
import Search from "../../header/search";
import {DB} from "../../features/firebase";

export default class Contact extends React.Component {
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
        this.DB = DB("teacher.contacts", ({data, index}) => this.setState({open: false, data, index, modified: new Date()}));
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
                </Header>
                <FlexBox>
                    <FullScreen open={open} title={item.title} onClose={this.onClose}>
                        <FlexScroll>
                            <FlexBox middle center>
                                <Form item={item} onSubmit={item => isAdd ? this.DB.add(item) : this.DB.change(item)}>
                                    <Field id="photo" type="text" title="Фотография"/>
                                    <Field id="firstname" type="text" title="Имя"/>
                                    <Field id="lastname" type="text" title="Фамилия"/>
                                    <Field id="patronymic" type="text" title="Отчество"/>
                                </Form>
                            </FlexBox>
                        </FlexScroll>
                    </FullScreen>

                    {data && data.length < 1 && <FlexBox middle center><IconButton color="secondary" onClick={this.onCreate}><AddIcon/></IconButton></FlexBox>}

                    <VirtualList
                        onPull={() => this.DB.load()}
                        data={data}
                        index={index}
                        modified={modified}
                        divider="inset"
                        template={(item) => (
                            <ListItem button alignItems="flex-start" onClick={() => this.onEdit(item)}>
                                {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                                <List>
                                    <ListItem>Имя: {item.firstname}</ListItem>
                                    <ListItem>Фамилия: {item.lastname}</ListItem>
                                    <ListItem>Отчество: {item.patronymic}</ListItem>
                                </List>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FlexBox>
        )
    }
}
