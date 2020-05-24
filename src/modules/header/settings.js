import React from 'react';
import {IconButton, Menu} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {List} from "../templates/list";


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {settingsOpen: false, anchorEl: null};
        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }
    handleMenu(event) {
        this.setState({settingsOpen: true, anchorEl: event.currentTarget})
    }
    handleClose() {
        this.setState({settingsOpen: false})
    }

    render() {
        return (
            <React.Fragment>
                <IconButton edge="end" onClick={this.handleMenu} color="inherit">
                    <MoreVertIcon/>
                </IconButton>
                <Menu keepMounted anchorEl={this.state.anchorEl} anchorOrigin={{vertical: 'top', horizontal: 'right'}} transformOrigin={{vertical: 'top', horizontal: 'right'}} open={this.state.settingsOpen} onClose={(this.handleClose)} onClick={this.handleClose}>
                    <List box>
                        {this.props.children}
                    </List>
                </Menu>
            </React.Fragment>
        )
    }
}




