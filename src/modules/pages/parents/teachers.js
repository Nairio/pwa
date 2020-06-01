import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class Teachers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("levels", ({data}) => {
            const levels = data.reduce((s, {_id, ...item}) => ({...s, [_id]: item}), {});
            this.setState({levels});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        if (!this.state.levels) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="teachers"
                    fields={[
                        {id: "lastname", title: "Фамилия", type: "text"},
                        {id: "firstname", title: "Имя", type: "text"},
                        {id: "patronymic", title: "Отчество", type: "text"},
                        {id: "sex", title: "Пол", type: "select", options: [{label: "Мужской", value: "Мужской"}, {label: "Женский", value: "Женский"}]},
                        {id: "birthday", title: "День рождения", type: "date"},
                        {id: "email", title: "Email", type: "text"},
                        {id: "levels", title: "Профессиональный уровень", type: "dbautocomplete", dbpath: "levels", dblabel: "levels"},
                        {id: "contract", title: "Договор", type: "doc"},
                    ]}
                    template={({firstname, patronymic, sex, birthday, lastname, email, levels, contract}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <p>{lastname} {firstname} {patronymic}</p>
                                <p>Пол: {sex}</p>
                                <p>День рождения: {new Date(birthday).toLocaleDateString()}</p>
                                <p>Профессиональный уровень: {this.state.levels[levels] ? this.state.levels[levels].levels : 0} (зарплата: {this.state.levels[levels] ? this.state.levels[levels].salary : 0}₽ / час)</p>
                                <p>Email: {email}</p>
                                {contract && <p><a onClick={e=>e.stopPropagation()} href={contract} rel="noopener noreferrer" target="_blank">Договор</a></p>}
                                {!contract && <p>Договор</p>}
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
