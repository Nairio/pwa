import React from 'react';
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

import GoHome from "../../header/go-home";
import {FlexBox} from "../../templates/flex";
import {Field, Form} from "../../templates/form";


export default class FormPage extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox middle center>
                    <Form item={{title: "111", text: "", date: "", time: ""}} onSubmit={items => alert(JSON.stringify(items))}>
                        <Field id="title" type="disabled" title="Название"/>
                        <Field id="text" type="text" title="Текст"/>
                        <Field id="date" type="date" title="Дата"/>
                        <Field id="time" type="time" title="Время"/>
                    </Form>
                </FlexBox>
            </FlexBox>
        )
    }
}
