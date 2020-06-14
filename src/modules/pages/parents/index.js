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

    onScheduler(scheduler, container){
        scheduler.init(container, new Date(2017,5,30), "year");
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
                        <Scheduler onScheduler={this.onScheduler}>
                            <div className="dhx_cal_navline">
                                <div className="dhx_cal_prev_button">&nbsp;</div>
                                <div className="dhx_cal_next_button">&nbsp;</div>
                                <div className="dhx_cal_today_button"/>
                                <div className="dhx_cal_date"/>
                                <div className="dhx_cal_tab" name="day_tab" style="right:204px;"/>
                                <div className="dhx_cal_tab" name="week_tab" style="right:140px;"/>
                                <div className="dhx_cal_tab" name="year_tab" style="right:280px;"/>
                                <div className="dhx_cal_tab" name="month_tab" style="right:76px;"/>
                            </div>
                            <div className="dhx_cal_header">
                            </div>
                            <div className="dhx_cal_data">
                            </div>
                        </Scheduler>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
