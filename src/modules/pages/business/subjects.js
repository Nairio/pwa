import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {FlexBox} from "../../templates/flex";
import {DB} from "../../features/firebase";


export default class Subjects extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="subjects"
                    fields={[
                        {id: "name", title: "Название", type: "text"},
                        {id: "description", title: "Описание", type: "text"},
                    ]}
                    template={({name, description, subject, program, level, cost, duration, age_from, age_to, count_in_group, _id}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <h3>{name}</h3>
                                <p>{description}</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
