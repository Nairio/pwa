import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {DB} from "../../features/firebase";
import FullScreen from "../../templates/fullscreen";
import Button from "@material-ui/core/Button";


export default class Courses extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
        this.onEdit = ()=>alert();
    }

    componentDidMount() {
        this.DB = DB("subjects", ({data}) => {
            const subjects = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({subjects});
        });
        this.DB.load();

        this.DB2 = DB("students-courses", ({data}) => {
            const studentsCourses = data.reduce((s, {student_id, course_id}) => ({...s, [student_id + "-" + course_id]: true}), {});
            this.setState({studentsCourses});
        });
        this.DB2.load();
    }

    componentWillUnmount() {
        this.DB.close();
        this.DB2.close()
    }

    render() {
        const {subjects, studentsCourses} = this.state;

        if (!subjects) return false;


        console.log({studentsCourses}, this.onEdit);

        this.onEdit();

        return (
            <FullScreen open={this.props.open} title={"Курсы"} onClose={this.props.onClose}>
                <DBVirtualList
                    single={false}
                    dbpath="courses"
                    fields={false}
                    template={({name, description, subjects, program, level, cost, duration, age_from, age_to, _id}, onEdit) => (
                        <ListItem button alignItems="flex-start">
                            <div>
                                <h3>{name}</h3>
                                <p>Предмет: {subjects[subjects]}</p>
                                <p>{description}</p>
                                <p>Уровень: {level}</p>
                                <p>Возраст: {age_from}-{age_to}</p>
                                <p>Продолжительность: {duration || 0} ак. часов</p>
                                <p>Стоимость: <b>{cost || 0}</b> ₽ / час</p>
                                {program && <p><a onClick={e=>e.stopPropagation()} href={program} rel="noopener noreferrer" target="_blank">Программа</a></p>}
                                {!program && <p>Программа</p>}
                            </div>
                            {(console.log(studentsCourses, this.props._id, _id, studentsCourses[this.props._id + "-" + _id]) || 1) && (this.onEdit=onEdit) && studentsCourses[this.props._id + "-" + _id] ?
                                (
                                    <b>Подключено</b>
                                )
                                    :
                                (
                                    <Button
                                        variant={"contained"}
                                        color={"secondary"}
                                        onClick={(e) => e.preventDefault() || e.stopPropagation() || this.DB2.add({student_id: this.props._id, course_id: _id})}
                                    >Подать заявку</Button>
                                )
                            }
                        </ListItem>
                    )}
                />
            </FullScreen>
        )
    }
}
