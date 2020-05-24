import React from 'react';
import {Box, IconButton} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export default class SwipeableLeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    toggleDrawer(open) {
        return (event) => {
            if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({open: open});
        }
    };
    render() {
        return (
            <React.Fragment>
                <IconButton edge="start" color="inherit" onClick={this.toggleDrawer(true)}><MenuIcon/></IconButton>
                <SwipeableDrawer disableSwipeToOpen={false} minFlingVelocity={250} hysteresis={0} swipeAreaWidth={10} transitionDuration={{ enter: 100, exit: 100 }} open={this.state.open} onClose={this.toggleDrawer(false)} onOpen={this.toggleDrawer(true)} onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
                    <Box style={{width: this.props.width}}>
                        {this.props.children}
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        )
    }
}
