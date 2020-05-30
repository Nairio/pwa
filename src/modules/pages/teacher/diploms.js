import React from 'react';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";


export default class Diploms extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                dbpath="teacher.diploms"
                fields={[
                    {id: "photo", title: "Фотография", type: "image"},
                    {id: "title", title: "Название диплома", type: "text"},
                    {id: "institution", title: "Учебное заведение", type: "text"},
                    {id: "specialty", title: "Специальность", type: "text"},
                    {id: "description", title: "Описание", type: "text"},
                ]}
                template={(item, onEdit) => (
                    <ListItem button alignItems="flex-start" onClick={onEdit}>
                        {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                        <List>
                            <ListItem>{item.title}</ListItem>
                            <ListItem>{item.institution}</ListItem>
                            <ListItem>{item.specialty}</ListItem>
                            <ListItem>{item.description}</ListItem>
                        </List>
                    </ListItem>
                )}
            />
        )
    }
}
