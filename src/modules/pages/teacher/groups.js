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
                        {id: "name", title: "Название", type: "text"},
                        {id: "address", title: "Адрес", type: "text"},
                        {id: "courses", title: "Курс", type: "dbautocomplete", dbpath: "teacher.courses", dblabel: "name"},
                    ]}
                    template={({name, address, count, duration, courses}, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            <div>
                                <p>Название: {name}</p>
                                <p>Адрес: {address}</p>
                                <p>Курс: {this.state.courses[courses]}</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
