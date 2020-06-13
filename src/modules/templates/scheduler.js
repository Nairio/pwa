import React from 'react';
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import "dhtmlx-scheduler/codebase/locale/locale_ru";

const scheduler = window.scheduler;

export default class Scheduler extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.schedulerContainer = React.createRef();
        this.props.onScheduler(scheduler);
    }

    componentDidMount() {
        scheduler.init(this.schedulerContainer.current);
        window.onresize = () => scheduler.render()
    }

    render() {
        return (
            <div ref={this.schedulerContainer} style={{width: "100%", height: "100%"}}/>
        )
    }
}
