import React from 'react';
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from "../features/history";

export default class GoHome extends React.Component {
    render() {
        return (
            <IconButton edge="start" color="inherit" onClick={() => {history.replace("/")}}>
                <ArrowBackIcon/>
            </IconButton>
        )
    }
}
