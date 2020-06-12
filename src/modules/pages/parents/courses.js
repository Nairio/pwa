import React from 'react';
import {ListItem} from "@material-ui/core";

import DBVirtualList from "../../templates/db-virtual-list";
import {DB} from "../../features/firebase";
import FullScreen from "../../templates/fullscreen";
import Button from "@material-ui/core/Button";
import {FlexBox} from "../../templates/flex";


class CallToActionButton extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {studentsCourses: false};
    }

    componentDidMount() {
        this.DB = DB("students-courses", ({data}) => {
            const studentsCourses = data.reduce((s, {student_id, course_id}) => ({...s, [student_id + "-" + course_id]: true}), {});
            this.setState({studentsCourses});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close()
    }

    render() {
        const {student_id, course_id} = this.props;

        if (!this.state.studentsCourses) return false;
        if(this.state.studentsCourses[student_id + "-" + course_id]) return <b>Подключено</b>;

        return (
            <Button
                variant={"contained"}
                color={"secondary"}
                onClick={() => this.DB.add({student_id, course_id})}
            >
                Подать заявку
            </Button>
        )
    }
}


export default class Courses extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {courses: false};
    }

    componentDidMount() {
        this.DB = DB("subjects", ({data}) => {
            const subjects = data.reduce((s, {_id, name}) => ({...s, [_id]: name}), {});
            this.setState({subjects});
        });
        this.DB.load();
    }

    componentWillUnmount() {
        this.DB.close();
    }

    render() {
        if (!this.state.subjects) return false;

        return (
            <FullScreen open={!!this.props.open} title={"Курсы"} onClose={this.props.onClose}>
                <FlexBox style={{overflow: "hidden"}}>
                    <DBVirtualList
                        single={false}
                        dbpath="courses"
                        fields={false}
                        template={({name, description, subjects, program, level, cost, duration, age_from, age_to, _id}, onEdit) => (
                            <ListItem button alignItems="flex-start">
                                <div>
                                    <h3>{name}</h3>
                                    <p>Предмет: {this.state.subjects[subjects]}</p>
                                    <p>{description}</p>
                                    <p>Уровень: {level}</p>
                                    <p>Возраст: {age_from}-{age_to}</p>
                                    <p>Продолжительность: {duration || 0} ак. часов</p>
                                    <p>Стоимость: <b>{cost || 0}</b> ₽ / час</p>
                                    {program && <p><a onClick={e=>e.stopPropagation()} href={program} rel="noopener noreferrer" target="_blank">Программа</a></p>}
                                    {!program && <p>Программа</p>}
                                </div>
                                <CallToActionButton student_id={this.props._id} course_id={_id}/>
                            </ListItem>
                        )}
                    />
                </FlexBox>
            </FullScreen>
        )
    }
}
