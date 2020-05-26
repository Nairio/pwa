import React from 'react';
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import HeaderTitle from "../../header/header-title";
import AddIcon from '@material-ui/icons/Add';
import {Avatar, ListItem, ListItemAvatar, List} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import FabRightBottom from "../../templates/fab-right-bottom";
import DeleteForeverIcon from "@material-ui/core/SvgIcon/SvgIcon";

export default class Diploms extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <DBVirtualList
                        single={false}
                        DBPath="teacher.diploms"
                        fields={[
                            {id: "photo", title: "Фотография", type: "text"},
                            {id: "firstname", title: "Имя", type: "text"},
                            {id: "lastname", title: "Фамилия", type: "text"},
                            {id: "patronymic", title: "Отчество", type: "text"},
                            {id: "patronymic2", title: "Отчество", type: "text"},
                            {id: "patronymic3", title: "Отчество", type: "text"},
                            {id: "patronymic4", title: "Отчество", type: "text"},
                            {id: "patronymic5", title: "Отчество", type: "text"},
                            {id: "patronymic6", title: "Отчество", type: "text"},
                            {id: "patronymic7", title: "Отчество", type: "text"},
                            {id: "patronymic8", title: "Отчество", type: "text"},
                            {id: "patronymic9", title: "Отчество", type: "text"},
                            {id: "patronymic0", title: "Отчество", type: "text"},
                            {id: "patronymicq", title: "Отчество", type: "text"},
                            {id: "patronymicw", title: "Отчество", type: "text"},
                            {id: "patronymice", title: "Отчество", type: "text"},
                            {id: "patronymicr", title: "Отчество", type: "text"},
                            {id: "patronymict", title: "Отчество", type: "text"},
                            {id: "patronymicy", title: "Отчество", type: "text"},
                            {id: "patronymicu", title: "Отчество", type: "text"},
                            {id: "patronymici", title: "Отчество", type: "text"},
                            {id: "patronymico", title: "Отчество", type: "text"},
                            {id: "patronymicp", title: "Отчество", type: "text"},
                            {id: "patronymica", title: "Отчество", type: "text"},
                            {id: "patronymics", title: "Отчество", type: "text"},
                        ]}
                        createButton={(onCreate) => (
                            <FabRightBottom color="secondary" onClick={onCreate}><AddIcon/></FabRightBottom>
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
                </FlexBox>
            </FlexBox>
        )
    }
}
