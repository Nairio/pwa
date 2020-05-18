import React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";


export default class Accordion extends React.Component {
    render() {
        return (
            <ExpansionPanel {...this.props}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>{this.props.header}</ExpansionPanelSummary>
                <ExpansionPanelDetails>{this.props.children}</ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}
