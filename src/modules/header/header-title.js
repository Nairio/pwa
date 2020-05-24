import React from 'react';
import {Typography} from "@material-ui/core";

export default class HeaderTitle extends React.Component {
    render() {
        return (
            <div style={{flexGrow: 1, width: 1, textAlign: this.props.align}}>
                <div style={{display: "grid"}}>
                    <Typography variant="h6" noWrap>{this.props.children}</Typography>
                </div>
            </div>
        )
    }
}
