import React from "react";
import MUIFab from "@material-ui/core/Fab";
import {FlexBar} from "./flex";

export default class FabRightBottom extends React.Component{
    render() {
        if (this.props.hide) return false;
        return (
            <FlexBar right>
                <MUIFab {...{...this.props, hide: undefined}} style={{margin: 24}}>
                    {this.props.children}
                </MUIFab>
            </FlexBar>
        )
    }
}