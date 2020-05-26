import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import FabRightBottom from "../../templates/fab-right-bottom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default class Diploms extends React.Component {
    render() {
        return (
            <DBVirtualList
                single={false}
                DBPath="teacher.diploms"
                fields={[
                    {id: "photo", title: "Фотография", type: "text"},
                    {id: "firstname", title: "Имя", type: "text"},
                    {id: "lastname", title: "Фамилия", type: "text"},
                    {id: "patronymic", title: "Отчество", type: "text"},
                ]}
                createButton={(onCreate) => (
                    <FabRightBottom size="small" color="secondary" onClick={onCreate}><AddIcon/></FabRightBottom>
                )}
                deleteButton={(onDelete) => (
                    <FabRightBottom size="small" color="secondary" onClick={onDelete}><DeleteForeverIcon/></FabRightBottom>
                )}
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
