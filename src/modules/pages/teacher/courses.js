import React from 'react';
import {ListItem, ListItemText} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";


export default class Courses extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    DBPath="teacher.courses"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                    ]}
                    template={({name, description}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <ListItemText primary={name} secondary={description}/>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
