import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";


export default class Courses extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    DBPath="teacher.courses"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                    ]}
                    template={(item, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
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
        )
    }
}
