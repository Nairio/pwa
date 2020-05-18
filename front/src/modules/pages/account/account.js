import React from 'react';
import {CircularProgress} from "@material-ui/core";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {storage} from "../../features/localstorage";
import {settings} from "../../features/settings";
import Header from "../../header/header";

export default class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {loading: false, error: false, auth: storage("auth") || {}};
        this.props.onSubmit(async (data, status = () => {}) => {
            status("start");

            try {
                const res = await fetch(settings.server, {method: "POST", body: JSON.stringify({...data, token: this.state.auth.token})});
                const json = await res.json();
                const {token, name = data.name, email = data.email} = json;

                if (token && ["register", "login"].includes(data.type)) storage("auth", {name, email, token});
                if (["logout"].includes(data.type)) storage("auth", false);

                status("success");
            } catch (e) {
                status("error");
            }
        });
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
