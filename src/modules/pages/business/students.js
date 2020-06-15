import React from 'react';
import {Avatar, ListItem, ListItemAvatar} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {DB} from "../../features/firebase";


export default class Students extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("students", ({data}) => {
            const parents = data.reduce((s, {_id, ...item}) => ({...s, [_id]: item}), {});
            this.setState({parents});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }
    render() {
        if (!this.state.parents) return false;

        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <DBVirtualList
                    single={false}
                    dbpath="students"
                    fields={[
                        {id: "photo", title: "Фотография", type: "image"},
                        {id: "firstname", title: "Имя", type: "text"},
                        {id: "lastname", title: "Фамилия", type: "text"},
                        {id: "patronymic", title: "Отчество", type: "text"},
                        {id: "parents", title: "Родитель", type: "dbautocomplete", dbpath: "parents", dblabel: ({lastname, patronymic, firstname}) => `${lastname || ""} ${patronymic || ""} ${firstname || ""}`},
                    ]}
                    template={(item, onEdit) => (
                        <ListItem button alignItems="flex-start" onClick={onEdit}>
                            {item.photo && <ListItemAvatar><Avatar src={item.photo}/></ListItemAvatar>}
                            <div>
                                <h3>{item.lastname} {item.firstname} {item.patronymic}</h3>
                                <p>Родители: {(({lastname, patronymic, firstname}) => `${lastname || ""} ${patronymic || ""} ${firstname || ""}`)(this.state.parents[item.parents] || {})}</p>
                            </div>
                        </ListItem>
                    )}
                />
            </FlexBox>
        )
    }
}
