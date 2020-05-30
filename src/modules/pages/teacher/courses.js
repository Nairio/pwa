import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class Courses extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {
        this.DB = DB("teacher.groups", ({data}) => {
            const groups = data.reduce((s, item) => ({...s, [item.courses]: [...(s[item.courses] || []), item]}), {});
            this.setState({groups});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        if (!this.state.groups) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="teacher.courses"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                        {id: "program", title: "Программа", type: "doc"},
                        {id: "duration", title: "Продолжительность, ак. часов", type: "number"},
                        {id: "level", title: "Уровень", type: "text"},
                        {id: "age_from", title: "Возраст от", type: "number"},
                        {id: "age_to", title: "Возраст до", type: "number"},
                        {id: "count_in_group", title: "Количество в группе", type: "number"},
                    ]}
                    template={({name, description, program, level, duration, age_from, age_to, count_in_group, _id}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <p>Уровень: {level}</p>
                                <p>Продолжительность: {duration || 0} ак. часов</p>
                                <p>Возраст: {age_from}-{age_to}</p>
                                <p><a onClick={e=>e.stopPropagation()} href={program} rel="noopener noreferrer" target="_blank">Программа</a></p>
                                <p>Количество групп: {this.state.groups[_id] ? this.state.groups[_id].length :  0} по {count_in_group || 0} студентов</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
