import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class History extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("subjects", ({data}) => {
            const subjects = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({subjects});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        if (!this.state.subjects) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="courses"
                    fields={[
                        {id: "subjects", title: "Предмет", type: "dbautocomplete", dbpath: "subjects", dblabel: "name"},
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                        {id: "program", title: "Программа", type: "doc"},
                        {id: "level", title: "Уровень", type: "text"},

                        {id: "age_from", title: "Возраст от", type: "number"},
                        {id: "age_to", title: "Возраст до", type: "number"},
                        {id: "duration", title: "Продолжительность, ак. часов", type: "number"},
                        {id: "count_in_group", title: "Количество в группе", type: "number"},
                        {id: "cost", title: "Стоимость за ак. час, ₽", type: "number"},
                    ]}
                    template={({name, description, subjects, program, level, cost, duration, age_from, age_to, count_in_group, _id}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <h3>{name}</h3>
                                <p>Предмет: {this.state.subjects[subjects]}</p>
                                <p>{description}</p>
                                <p>Уровень: {level}</p>
                                <p>Возраст: {age_from}-{age_to}</p>
                                <p>Продолжительность: {duration || 0} ак. часов</p>
                                <p>Стоимость: <b>{cost || 0}</b> ₽ / час</p>
                                {program && <p><a onClick={e=>e.stopPropagation()} href={program} rel="noopener noreferrer" target="_blank">Программа</a></p>}
                                {!program && <p>Программа</p>}
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
