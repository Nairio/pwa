import React from 'react';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {FlexBar, FlexBox, FlexScroll} from "./flex";

class Swipeable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || 0,
            value2: this.props.value || 0,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                value: this.props.value || 0,
                value2: this.props.value || 0,
            });
        }
        if (prevState.value !== this.state.value) {
            this.props.switch && this.props.switch(this.state.value);
            this.setState({value2: this.state.value});
        }
    }



    render() {
        const value = +this.state.value;
        const value2 = +this.state.value2;

        return (
            <React.Fragment>
                {
                    this.props.type === "top" && this.props.children.map && (
                        <FlexBar>
                            <AppBar position="static" color="default">
                                <Tabs variant="scrollable" value={value2} onChange={(e, value) => this.setState({value})}>
                                    {this.props.children.map((child, i) => <Tab key={i} label={child.props.title}/>)}
                                </Tabs>
                            </AppBar>
                        </FlexBar>
                    )
                }
                <FlexBox>
                    <SwipeableViews containerStyle={{flexGrow: 1}} className="Flex Box" slideClassName="Flex Box" index={value} onChangeIndex={value => this.setState({value})}>
                        {(this.props.children.map ? this.props.children : [this.props.children]).map((child, i) => <FlexScroll key={i}>{<child.props.component {...child.props} submit={this.props.submit} switch={value=>this.setState({value})}/>}</FlexScroll>)}
                    </SwipeableViews>
                </FlexBox>
                {
                    this.props.type === "bottom" && this.props.children.map && (
                        <FlexBar>
                            <BottomNavigation value={value} onChange={(e, value) => this.setState({value})} showLabels style={{width: "100%"}}>
                                {this.props.children.map((child, i) => <BottomNavigationAction key={i} label={child.props.title} icon={child.props.icon}/>)}
                            </BottomNavigation>
                        </FlexBar>
                    )
                }
            </React.Fragment>
        )
    }
}

export class SwipeableTop extends React.Component {
    render() {
        return (
            <Swipeable type="top" {...this.props}>{this.props.children}</Swipeable>
        )
    }
}

export class SwipeableBottom extends React.Component {
    render() {
        return (
            <Swipeable type="bottom" {...this.props}>{this.props.children}</Swipeable>
        )
    }
}
