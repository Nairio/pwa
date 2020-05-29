import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";


export default class Chat extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                dbPath="teacher.chat"
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
        )
    }
}
