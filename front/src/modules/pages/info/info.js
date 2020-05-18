import React from 'react';
import {FlexBox} from "../../templates/flex";
import GoHome from "../../header/go-home";
import Accordion from "../../templates/accordion";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

export default class Info extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <Accordion header="Что это такое?">Это PWA приложение</Accordion>
                    <Accordion header="Как пользоваться?">Так же, как и остальными приложениями</Accordion>
                    <Accordion header="Где находятся файлы?">Файлы находятся на вашем устройстве</Accordion>
                </FlexBox>
            </FlexBox>
        )
    }
}
