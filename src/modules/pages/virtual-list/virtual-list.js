import React from 'react';

import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";

import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DBVirtualList from "../../templates/db-virtual-list";
import FabRightBottom from "../../templates/fab-right-bottom";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default class VirtualListPage extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <DBVirtualList
                        single={false}
                        DBPath="data"
                        fields={[
                            {id: "img", title: "Иконка", type: "image"},
                            {id: "_id", title: "Идентификатор", type: "disabled"},
                            {id: "sort", title: "Сортировка", type: "disabled"},
                            {id: "title", title: "Название", type: "text"},
                            {id: "text", title: "Текст", type: "text"},
                        ]}
                        createButton={(onCreate) => (
                            <FabRightBottom color="secondary" onClick={onCreate}><AddIcon/></FabRightBottom>
                        )}
                        deleteButton={(onDelete) => (
                            <FabRightBottom size="small" color="secondary" onClick={onDelete}><DeleteForeverIcon/></FabRightBottom>
                        )}
                        template={(item, onEdit) => (
                            <ListItem button alignItems="flex-start">
                                {item.img && <ListItemAvatar><Avatar src={item.img}/></ListItemAvatar>}
                                <ListItemText inset={!item.img} primary={`${item.title} ${item.text}`} secondary={item._id}/>
                                <IconButton onClick={onEdit}><EditIcon/></IconButton>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FlexBox>
        )
    }
}