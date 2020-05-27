import React from 'react';
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

import GoHome from "../../header/go-home";
import {FlexBox} from "../../templates/flex";
import {LoadableImage} from "../../templates/loadable-image";


export default class LoadableImagePage extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox middle center>
                    <LoadableImage src={""} name={"hello"} title={"title"}/>
                </FlexBox>
            </FlexBox>
        )
    }
}
