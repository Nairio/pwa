import React from "react";
import MUIFab from "@material-ui/core/Fab";

export default class FabRightBottom extends React.Component{
    render() {
        if (this.props.hide) return false;
        return (
            <div style={{position: "fixed", right: 0, bottom: 0, margin: 24}}>
                <MUIFab {...{...this.props, hide: undefined}}>
                    {this.props.children}
                </MUIFab>
            </div>
        )
    }
}