import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

import ruLocale from "date-fns/locale/ru";

import {useState} from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const StaticDatePicker = () => {
    const [date, changeDate] = useState(new Date());

    return (
        <MuiPickersUtilsProvider  locale={ruLocale} utils={DateFnsUtils}>
            <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={changeDate}
            />
        </MuiPickersUtilsProvider>
    );
};

export default class Calendar extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexScroll>
                    <FlexBox center middle>
                        <StaticDatePicker/>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
