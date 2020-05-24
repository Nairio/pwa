import React from 'react';
import {AppBar, IconButton, Input, Toolbar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {open: false, value: ""}
    }

    onChange(e) {
        const value = e.target.value;
        this.setState({value});
        this.props.onChange && this.props.onChange(value);
    }

    render() {
        if (this.state.open) return (
            <AppBar position="absolute" color="default" onBlur={() => this.setState({open: false})}>
                <Toolbar variant="dense">
                    <IconButton edge="start" onClick={() => this.setState({open: false})}><ArrowBackIcon/></IconButton>
                    <Input value={this.state.value} onChange={this.onChange} fullWidth autoFocus placeholder="Поиск..."/>
                    <IconButton onMouseDown={e => e.preventDefault()}><SearchIcon/></IconButton>
                </Toolbar>
            </AppBar>
        );

        return <IconButton onClick={() => this.setState({open: true})} color="inherit"><SearchIcon/></IconButton>
    }
}
