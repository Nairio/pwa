import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class Teachers extends React.Component {
    render() {
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
                        {id: "sex", title: "Пол", type: "select", options: [{label: "Мужской", value: "m"}, {label: "Женский", value: "w"}]},
                        {id: "birthday", title: "День рождения", type: "date"},
                        {id: "email", title: "Email", type: "text"},
                        {id: "level", title: "Профессиональный уровень", type: "number"},
                        {id: "contract", title: "Договор", type: "doc"},
                    ]}
                    template={({firstname, patronymic, sex, birthday, lastname, email, level, contract}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <p>{lastname} {firstname} {patronymic}</p>
                                <p>Пол: {sex}</p>
                                <p>День рождения: {birthday}</p>
                                <p>Профессиональный уровень: {level}</p>
                                <p>{email}</p>
                                {contract && <p><a onClick={e=>e.stopPropagation()} href={contract} rel="noopener noreferrer" target="_blank">Договор</a></p>}
                                {!contract && <p>Программа</p>}
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
