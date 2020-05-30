import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {DB} from "../../features/firebase";


export default class Groups extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("teacher.courses", ({data}) => {
            const courses = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({courses});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        if (!this.state.courses) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="teacher.groups"
                    fields={[
                        {id: "courses", title: "Курс", type: "dbautocomplete", dbpath: "teacher.courses", dblabel: "name"},
                        {id: "name", title: "Название", type: "text"},
                        {id: "address", title: "Адрес", type: "text"},
                        {id: "monday", title: "Понедельник", type: "time"},
                        {id: "tuesday", title: "Вторник", type: "time"},
                        {id: "wednesday", title: "Среда", type: "time"},
                        {id: "thursday", title: "Четверг", type: "time"},
                        {id: "friday", title: "Пятница", type: "time"},
                        {id: "saturday", title: "Суббота", type: "time"},
                        {id: "sunday", title: "Воскресенье", type: "time"},
                    ]}
                    template={(item, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <p>Курс: {this.state.courses[item.courses]}</p>
                                <p>Название: {item.name}</p>
                                <p>Адрес: {item.address}</p>
                                {item.monday && <p>Понедельник: {item.monday}</p>}
                                {item.tuesday && <p>Вторник: {item.tuesday}</p>}
                                {item.wednesday && <p>Среда: {item.wednesday}</p>}
                                {item.thursday && <p>Четверг: {item.thursday}</p>}
                                {item.friday && <p>Пятница: {item.friday}</p>}
                                {item.saturday && <p>Суббота: {item.saturday}</p>}
                                {item.sunday && <p>Воскресенье: {item.sunday}</p>}
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
