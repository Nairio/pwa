import React from 'react';
import {CircularProgress} from "@material-ui/core";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import {Auth} from "../../features/firebase";

export default class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.onSubmit((data, answer) => Auth(data).then(({ok, email, name}) => answer(ok, () => this.props.onChange({email, name}))));
    }

    render() {
        return (
            <Header>
                <GoHome/>
                <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                <CircularProgress/>
            </Header>
        )
    }
}
