import React from 'react';
import {Avatar, ListItem, ListItemAvatar} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";


export default class Experience extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                dbpath="teacher.experience"
                fields={[
                    {id: "organization", title: "Организация", type: "text"},
                    {id: "position", title: "Должность", type: "text"},
                    {id: "start", title: "Дата начала", type: "date"},
                    {id: "end", title: "Дата окончания", type: "date"},
                ]}
                template={(item, onEdit) => (
                    <ListItem button alignItems="flex-start" onClick={onEdit}>
                        {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                        {item.organization} {item.position} {new Date(item.start).toLocaleDateString()} {item.end && ` - ${new Date(item.end).toLocaleDateString()}`}
                    </ListItem>
                )}
            />
        )
    }
}
