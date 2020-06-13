import React from 'react';
import {FlexBox} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import "dhtmlx-scheduler/codebase/locale/locale_ru"

const scheduler = window.scheduler;



export default class Calendar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.schedulerContainer = React.createRef();
    }

    componentDidMount() {
        scheduler.init(this.schedulerContainer.current);
        window.onresize = () => scheduler.render()
    }

    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <div ref={this.schedulerContainer} style={{width: "100%", height: "100%"}}/>
                </FlexBox>
            </FlexBox>
        )
    }
}
