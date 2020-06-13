import React from 'react';
import {FlexBox} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import Scheduler from "../../templates/scheduler";
export default class Calendar extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <Scheduler onScheduler={scheduler => console.log(scheduler)}/>
                </FlexBox>
            </FlexBox>
        )
    }
}
