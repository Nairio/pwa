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
        this.state = {courses: false, places: false};
    }

    componentDidMount() {
        this.DB = DB("courses", ({data}) => {
            const courses = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({courses});
        });
        this.DB.load();

        this.DB2 = DB("places", ({data}) => {
            const places = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({places});
        });
        this.DB2.load();

        this.DB3 = DB("teachers", ({data}) => {
            const teachers = data.reduce((s, {_id, ...item}) => ({...s, [_id]: item}), {});
            this.setState({teachers});
        });
        this.DB3.load();
    }

    componentWillUnmount() {
        this.DB.close();
        this.DB2.close();
        this.DB3.close()
    }

    render() {
        if (!this.state.courses) return false;
        if (!this.state.places) return false;
        if (!this.state.teachers) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="groups"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "courses", title: "Курс", type: "dbautocomplete", dbpath: "courses", dblabel: "name"},
                        {id: "places", title: "Место", type: "dbautocomplete", dbpath: "places", dblabel: "name"},
                        {id: "teachers", title: "Преподаватель", type: "dbautocomplete", dbpath: "teachers", dblabel: "firstname"},

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
                                <p>Адрес: {this.state.places[item.places]}</p>
                                <p>Преподаватель: {(({firstname, lastname, patronymic})=>`${lastname} ${firstname} ${patronymic}`)(this.state.teachers[item.teachers])}</p>
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
