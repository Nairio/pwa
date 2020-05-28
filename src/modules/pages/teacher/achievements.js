import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";


export default class Achievements extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                DBPath="teacher.achievements"
                fields={[
                    {id: "title", title: "Название", type: "text"},
                    {id: "description", title: "Описание", type: "text"},
                    {id: "photo", title: "Фотография", type: "image"},
                ]}
                template={(item, onEdit) => (
                    <ListItem button alignItems="flex-start" onClick={onEdit}>
                        {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                        <List>
                            <ListItem>{item.title}</ListItem>
                            <ListItem>{item.description}</ListItem>
                        </List>
                    </ListItem>
                )}
            />
        )
    }
}
