import {gantt} from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import React from "react";
import {DB} from "../features/firebase";
import styled from "styled-components";

export default class DbGantt extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.ganttContainer = React.createRef();
        this.Div = styled.div`.gantt_task_cell {border: none !important}.gantt_task_cell.first_day {border-left: 1px solid #ebebeb !important}`;
    }

    componentDidMount() {
        const {start, end, dbpath} = this.props;

        gantt.config.date_format = "%d.%m.%Y";
        gantt.config.scales = [
            {unit: "year", step: 1, format: "%Y"},
            {unit: "month", step: 1, format: "%M"},
            {unit: "day", step: 1, format: " "},
        ];
        gantt.config.columns = [
            {name: "text", label: "Задача", tree: true, width: '*'},
            {name: "add", width: 44, min_width: 44, max_width: 44},
        ];
        gantt.config.scale_height = 50;
        gantt.config.min_column_width = 0;
        gantt.config.row_height = 20;
        gantt.config.grid_width = 300;
        gantt.config.undo_steps = 10000;
        gantt.config.order_branch = true;
        gantt.i18n.setLocale("ru");
        gantt.config.buttons_left = ["dhx_save_btn", "dhx_cancel_btn"];
        gantt.templates.timeline_cell_class = (task, date) => date.getDate() === 1 && "first_day";
        gantt.templates.task_class = (start, end, task) => (task.$level !== 3 && "folder") || (task.modified && "modified");
        gantt.templates.grid_row_class = (start, end, task) => task.$level === 2 && "can_add";
        gantt.plugins({undo: true});
        gantt.plugins({marker: true});
        gantt.addMarker({start_date: new Date(), css: "status_line"});
        gantt.attachEvent("onTaskOpened", (id) => gantt.updateTask(id, {...gantt.getTask(id), open: true}), false);
        gantt.attachEvent("onTaskClosed", (id) => gantt.updateTask(id, {...gantt.getTask(id), open: false}), false);
        gantt.attachEvent("onMouseMove", (id, {clientX, clientY}) => {
            const t = document.getElementsByClassName("gantt_tooltip")[0];
            if (!id) return t && (t.style.display = "none");
            const el = t ? t : document.body.appendChild(document.createElement("div"));
            const task = gantt.getTask(id);
            el.className = "gantt_tooltip";
            el.style.display = "block";
            el.style.top = clientY + 20 + "px";
            el.style.left = clientX + "px";
            el.innerHTML = `
                <b>${gantt.date.date_to_str("%d.%m.%Y")(task.start_date)} - ${gantt.date.date_to_str("%d.%m.%Y")(task.end_date)}</b>
                <p>${Math.round(task.progress*100)}%</p>
            `;
        }, false);
        

        gantt.init(this.ganttContainer.current);

        gantt.config.start_date = start;
        gantt.config.end_date = end;

        const db = DB(dbpath, ({data}) => gantt.parse({data: data.filter(d => d._mode === "task"), links: data.filter(d => d._mode === "link")}));
        db.load();
        gantt.createDataProcessor((mode, taskState, item) => {
            delete item["!nativeeditor_status"];
            item._mode = mode;
            item.title = item.text;
            taskState === "create" && db.add(item);
            taskState === "update" && db.change(item);
            taskState === "delete" && db.delete(item);
        });
    }

    render() {
        return (
            <this.Div ref={this.ganttContainer} style={{width: "100%", height: "100%", position: "absolute"}}/>
        )
    }
}
