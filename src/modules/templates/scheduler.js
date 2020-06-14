import React from 'react';
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import "dhtmlx-scheduler/codebase/locale/locale_ru";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_year_view";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_recurring";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_readonly";


import styled from "styled-components";

export default class Scheduler extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.schedulerContainer = React.createRef();
    }

    componentDidMount() {
        const {scheduler} = window;
        const {start, end} = this.props;
        scheduler.config.year_x = 1;
        scheduler.config.year_y = start.getMonth() + 1 + Math.floor((end - start) / 1000 / 60 / 60 / 24 / 30);
        scheduler.config.agenda_start = start;
        scheduler.config.agenda_end = end;
        scheduler.templates.year_month = scheduler.date.date_to_str("%F, %Y");
        scheduler.locale.labels["repeat_radio_month_type"] = "";
        scheduler.locale.labels.day_for_recurring = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        scheduler.locale.date.day_full = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        scheduler.locale.labels.repeat_radio_end2 = "Всего";
        scheduler.locale.labels.repeat_radio_month_start = "Каждый";
        scheduler.locale.labels.repeat_radio_month_type = "Каждое";
        scheduler.locale.labels.repeat_year_label = "Каждый";
        scheduler.locale.labels.select_year_day2 = "";
        scheduler.locale.labels.select_year_month = "";
        scheduler.locale.labels.repeat_radio_day_type = "Каждое";
        scheduler.locale.labels.repeat_text_month_count2_before = "ч/з каждые";
        scheduler.locale.labels.repeat_text_month_count2_after = "месяц";
        scheduler.locale.labels.repeat_text_year_day = "";
        scheduler.locale.labels.repeat_text_month_day = "число ч/з каждые";
        scheduler.locale.labels.repeat_text_month_count = "месяц";
        scheduler.locale.labels.repeat_text_day_count = "число";
        scheduler.config.repeat_date = "%d.%m.%Y";

        scheduler.config.prevent_cache = true;
        scheduler.config.details_on_create=true;
        scheduler.config.details_on_dblclick=true;
        scheduler.config.occurrence_timestamp_in_utc = true;
        scheduler.config.include_end_by = true;
        scheduler.config.repeat_precise = true;
        scheduler.init(this.schedulerContainer.current);

        window.onresize = () => scheduler.render();

        this.props.onScheduler && this.props.onScheduler(scheduler);
    }

    render() {
        const Div = styled.div`
            .dhx_before, .dhx_after {opacity: 0.1} 
            .dhx_year_box {display: none}
            .dhx_year_box: nth-child(1n + ${this.props.start.getMonth() + 1}) {display: inline-block}
        `;
        return (
            <Div ref={this.schedulerContainer} style={{width: "100%", height: "100%", position: "absolute"}}/>
        )
    }
}
