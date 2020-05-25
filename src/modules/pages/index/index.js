import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

export default class Index extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexScroll>
                    <FlexBox center middle>
                        <h1>{this.props.title}T</h1>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
