import React from 'react';
import {Avatar, ListItem, ListItemAvatar} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DvrIcon from '@material-ui/icons/Dvr';
import Courses from "./courses";

export default class Students extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onCourses = this.onCourses.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {open: false}
    }

    onCourses(){

    }

    onClose(){
        this.setState({open: false})
    }

    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <Courses open={this.state.open} _id={this.state._id} onClose={this.onClose}/>
                    <DBVirtualList
                        single={false}
                        dbpath="students"
                        fields={[
                            {id: "photo", title: "Фотография", type: "image"},
                            {id: "firstname", title: "Имя", type: "text"},
                            {id: "lastname", title: "Фамилия", type: "text"},
                            {id: "patronymic", title: "Отчество", type: "text"},
                            {id: "sex", title: "Пол", type: "select", options: [{label: "Мужской", value: "Мужской"}, {label: "Женский", value: "Женский"}]},
                            {id: "birthday", title: "День рождения", type: "date"},
                        ]}
                        template={({_id, ...item}, onEdit) => (
                            <ListItem button alignItems="flex-start">
                                {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                                <h3>{item.lastname} {item.firstname} {item.patronymic}</h3>
                                <IconButton onClick={onEdit}><EditIcon/></IconButton>
                                <IconButton onClick={() => this.setState({open: true, _id})}><DvrIcon/></IconButton>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FlexBox>
        )
    }
}
