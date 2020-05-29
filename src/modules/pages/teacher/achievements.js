import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";



export default class Achievements extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                dbPath="teacher.achievements"
                fields={[
                    {id: "title", title: "Название", type: "text"},
                    {id: "description", title: "Описание", type: "text"},
                    {id: "photo", title: "Фотография", type: "image"},
                ]}
                template={(item, onEdit) => (
                    <ListItem button alignItems="flex-start" onClick={onEdit}>
                        {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                        <ListItemText inset={!item.photo} primary={item.title} secondary={item.description}/>
                    </ListItem>
                )}
            />
        )
    }
}
