import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";


export default class Groups extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbPath="teacher.groups"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "address", title: "Адрес", type: "text"},
                        {id: "age_from", title: "Возраст от", type: "text"},
                        {id: "age_to", title: "Возраст до", type: "text"},
                        {id: "count", title: "Количество человек", type: "text"},
                        {id: "course", title: "Курс", type: "dbautocomplete", dbpath: "teacher.courses", dblabel: "name"},
                    ]}
                    template={({name, address, age_from, age_to, count, duration}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            {`${name}, ${address}, ${age_from}, ${age_to}, ${count}, ${duration}`}
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
