import React from 'react';
import {CircularProgress} from "@material-ui/core";
import GoHome from "../../header/go-home";
import HeaderTitle from "../../header/header-title";
import {storage} from "../../features/localstorage";
import {settings} from "../../features/settings";
import Header from "../../header/header";
import {getClientId} from "../../features/client";

export default class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {loading: false, error: false, auth: storage("auth") || {}};
        this.props.onSubmit(async (data, answer = () => {}) => {
            try {
                const clientId = getClientId();
                const {ok, name, email} = await (await fetch(settings.server, {method: "POST", body: JSON.stringify({...this.state.auth, ...data, appId: "auth", clientId})})).json();

                if (["register", "login"].includes(data.type)) storage("auth", {name, email});
                if (["logout"].includes(data.type)) storage("auth", false, getClientId(true));

                answer(ok);
                ok && this.props.onChange(ok);
                console.log({ok});
            } catch (e) {
                answer({ok: 0});
                console.log({ok: 0});
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
