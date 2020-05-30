import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {DB} from "../../features/firebase";


export default class Students extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("business.groups", ({data}) => {
            const groups = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({groups});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }
    render() {
        if (!this.state.groups) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="teacher.students"
                    fields={[
                        {id: "photo", title: "Фотография", type: "image"},
                        {id: "firstname", title: "Имя", type: "text"},
                        {id: "lastname", title: "Фамилия", type: "text"},
                        {id: "patronymic", title: "Отчество", type: "text"},
                        {id: "groups", title: "Группа", type: "dbautocomplete", dbpath: "business.groups", dblabel: "name"},
                    ]}
                    template={(item, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                            <List>
                                <ListItem>Имя: {item.firstname}</ListItem>
                                <ListItem>Фамилия: {item.lastname}</ListItem>
                                <ListItem>Отчество: {item.patronymic}</ListItem>
                                <ListItem>Группа: {this.state.groups[item.groups]}</ListItem>
                            </List>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
