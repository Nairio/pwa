import React from 'react';
import {FlexBar} from "../templates/flex";
import {AppBar, Toolbar} from "@material-ui/core";

export default class Header extends React.Component {
    render() {
        return (
            <div className="PWAHeader">
                <FlexBar>
                    <AppBar position="relative" color="primary">
                        <Toolbar variant="dense">
                            {this.props.children}
                        </Toolbar>
                    </AppBar>
                </FlexBar>
            </div>
        )
    }
}