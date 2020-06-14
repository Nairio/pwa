import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import Scheduler from "../../templates/scheduler";
import {storage} from "../../features/localstorage";


export default class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onScheduler = this.onScheduler.bind(this);
    }

    onScheduler(scheduler) {
        scheduler.config.header = ["year", "month", "day", "agenda", "prev", "next"];

        scheduler.config.first_hour = 8;
        scheduler.config.last_hour = 20;
        scheduler.config.time_step = 30;
        scheduler.config.limit_time_select = true;

        scheduler.config.readonly_form = true;
        scheduler.config.details_on_dblclick = true;
        scheduler.config.dblclick_create = false;
        scheduler.attachEvent("onBeforeDrag", () => false);
        scheduler.attachEvent("onClick", (id) => scheduler.getState().mode === "day" ? scheduler.showLightbox(id) && false : true);


        scheduler.locale.labels.section_subject = "Subject";
        const subject = [
            {key: '', label: 'Appointment'},
            {key: 'english', label: 'English'},
            {key: 'math', label: 'Math'},
            {key: 'science', label: 'Science'}
        ];
        scheduler.templates.event_class = (start, end, event) => {
            const css = [];
            if (event.subject) css.push("event_" + event.subject);
            if (event.id === scheduler.getState().select_id) css.push("selected");
            return css.join(" ");
        };
        scheduler.config.lightbox.sections = [
            {name: "description", height: 43, map_to: "text", type: "textarea", focus: true},
            {name: "subject", height: 20, type: "select", options: subject, map_to: "subject"},
            {name:"recurring", type:"recurring", map_to:"rec_type", button:"recurring"},
            {name: "time", height: 72, type: "time", map_to: "auto"}
        ];

        const changed = (taskState, id, {_end_date, _start_date, ...item}) => {
            const index = data.findIndex(d => d.id === id);
            taskState === "create" && data.push(item);
            taskState === "update" && (data[index] = item);
            taskState === "delete" && data.splice(index, 1);
            storage("data", data);
        };
        const data = storage("data") || [
            {id: 1, start_date: "2020-10-30 18:00", end_date: "2020-10-30 19:00", text: "Appointment A-48865", type: "appointment"},
            {id: 2, start_date: "2020-09-01 18:00", end_date: "2020-09-01 19:00", text: "Task T-44864", type: "task"},
            {id: 3, start_date: "2020-09-02 18:30", end_date: "2020-09-02 19:00", text: "Training T-46558", type: "training"},
            {id: 4, start_date: "2020-09-03 18:30", end_date: "2020-09-03 19:00", text: "Appointment A-45564", type: "appointment"}
        ];
        scheduler.attachEvent("onEventAdded", (id, item) => changed("create", id, item));
        scheduler.attachEvent("onEventChanged", (id, item) => changed("update", id, item));
        scheduler.attachEvent("onEventDeleted", (id, item) => changed("delete", id, item));

        scheduler.parse(data);
        scheduler.render(new Date(2020, 8,1), "year");
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
                        <Scheduler start={new Date(2020, 8)} end={new Date(2021, 4)} onScheduler={this.onScheduler}/>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
