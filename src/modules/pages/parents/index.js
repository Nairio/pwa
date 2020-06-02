import React from 'react';
import {FlexBox} from "../../templates/flex";
import { DatePicker } from "@material-ui/pickers";


export default class Index extends React.Component {
    render() {
        return (
            <FlexBox>
                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={date}
                    onChange={changeDate}
                />
            </FlexBox>
        )
    }
}
