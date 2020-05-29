import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";


export default class Courses extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    DBPath="teacher.courses"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                        {id: "duration", title: "Продолжительность, часов", type: "text"},
                    ]}
                    template={({name, description, duration}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <h3>{name}</h3>
                                <p>{description}</p>
                                <p>{`Курс ${duration} часов`}</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
