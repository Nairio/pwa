import Header from "../../header/header";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import React from "react";

export default class Hslide extends React.Component{
    render() {
        return (
            <Header>
                <GoHome/>
                <HeaderTitle align="left">{this.props.title}</HeaderTitle>
            </Header>
        )
    }

}