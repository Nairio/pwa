import React from 'react';
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
import "dhtmlx-scheduler/codebase/locale/locale_ru";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_year_view";

export default class Scheduler extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.schedulerContainer = React.createRef();
    }

    componentDidMount() {
        this.props.onScheduler(window.scheduler, this.schedulerContainer.current);
    }

    render() {
        return (
            <div ref={this.schedulerContainer} style={{width: "100%", height: "100%"}}>
                {this.props.children}
            </div>
        )
    }
}
