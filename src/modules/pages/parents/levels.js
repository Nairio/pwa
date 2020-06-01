import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";


export default class Levels extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="levels"
                    fields={[
                        {id: "levels", title: "Уровень", type: "number"},
                        {id: "salary", title: "Зарплата в час", type: "number"},
                    ]}
                    template={({levels, salary}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <p>Уровень: {levels}</p>
                                <p>Зарплата: {salary} ₽ в час</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
