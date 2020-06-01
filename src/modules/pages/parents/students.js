import React from 'react';
import {Avatar, ListItem, ListItemAvatar} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox, FlexScroll} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {DB} from "../../features/firebase";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DvrIcon from '@material-ui/icons/Dvr';
import FullScreen from "../../templates/fullscreen";
import {Field, Form} from "../../templates/form";
import FabRightBottom from "../../templates/fab-right-bottom";
import DeleteForeverIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Courses from "./courses";

export default class Students extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onCourses = this.onCourses.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {open: false}
    }

    onCourses(){
        this.setState({open: true})
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
                <FullScreen open={this.state.open} title={"Курсы"} onClose={this.onClose}>
                    <Courses/>
                </FullScreen>
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
                    template={(item, onEdit) => (
                        <ListItem button alignItems="flex-start">
                            {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                            <h3>{item.lastname} {item.firstname} {item.patronymic}</h3>
                            <IconButton onClick={onEdit}><EditIcon/></IconButton>
                            <IconButton onClick={this.onCourses}><DvrIcon/></IconButton>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
