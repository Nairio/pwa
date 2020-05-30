import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";


export default class Reports extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="teacher.reports"
                    fields={[
                        {id: "photo", title: "Фотография", type: "image"},
                        {id: "firstname", title: "Имя", type: "text"},
                        {id: "lastname", title: "Фамилия", type: "text"},
                        {id: "patronymic", title: "Отчество", type: "text"},
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
