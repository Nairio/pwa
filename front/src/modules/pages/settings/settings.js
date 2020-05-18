import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import Settings from "../../header/settings";
import {Item} from "../../templates/list";
import Divider from "@material-ui/core/Divider";
import {storage} from "../../features/localstorage";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShareIcon from '@material-ui/icons/Share';
import {share} from "../../features/share";
import GoHome from "../../header/go-home";

export default class SettingsPage extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                    <Settings>
                        <Item title={storage("auth") ? `${storage("auth").name} (${storage("auth").email})` : "Вход"} icon={storage("auth") ? <AccountBoxIcon/> : <ExitToAppIcon/>} path="/account/"/>
                        <Divider/>
                        <Item title="Поделиться" icon={<ShareIcon/>} disabled={!window.Windows && !navigator.share} onClick={share}/>
                    </Settings>
                </Header>
                <FlexScroll>
                    <FlexBox center middle>
                        <h1>{this.props.title}</h1>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
