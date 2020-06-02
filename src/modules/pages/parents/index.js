import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';


const localizer = momentLocalizer(moment)


export default class Index extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexScroll>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </FlexScroll>
            </FlexBox>
        )
    }
}
