import React from 'react';
import FullScreen from "../../templates/fullscreen";
import history from "../../features/history";
import {FlexBox} from "../../templates/flex";


export default class FullScreenPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {open: false};
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.setState({open: true})
    }

    onClose () {
        this.setState({open: false});
        history.replace("/");
    }

    render() {
        return (
            <FullScreen open={this.state.open} title={this.props.title} onClose={this.onClose}>
                <FlexBox middle center>
                    {this.props.title}
                </FlexBox>
            </FullScreen>
        )
    }
}
