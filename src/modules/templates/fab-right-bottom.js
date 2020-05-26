import React from "react";
import MUIFab from "@material-ui/core/Fab";


export default class FabRightBottom extends React.Component{
    render() {
        if (this.props.hide) return false;
        return (
            <div style={{
                position: "absolute",
                paddingLeft: "100%",
                marginLeft: "-60px",
                marginTop: "-60px",
                top: "100%",
            }}>
                <MUIFab {...{...this.props, hide: undefined}}>
                    {this.props.children}
                </MUIFab>
            </div>
        )
    }
}