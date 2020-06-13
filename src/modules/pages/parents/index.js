import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import Scheduler from "../../templates/scheduler";


export default class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onScheduler = this.onScheduler.bind(this);
    }

    onScheduler(scheduler){
        console.log(scheduler);
        scheduler.init('scheduler_here',new Date(2017,5,30),"year");
    }

    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexScroll>
                    <FlexBox center top>
                        <Scheduler onScheduler={this.onScheduler}/>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
