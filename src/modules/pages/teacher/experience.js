import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";


export default class Experience extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                DBPath="teacher.experience"
                fields={[
                    {id: "organization", title: "Организация", type: "text"},
                    {id: "position", title: "Должность", type: "text"},
                    {id: "start", title: "Дата начала", type: "date"},
                    {id: "end", title: "Дата окончания", type: "date"},
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
