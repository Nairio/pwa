import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styled from "styled-components";
import {Route, Switch, withRouter} from "react-router-dom";
import {FlexScreen} from "../templates/flex";

const timeout = 300;

const Section = styled.section`
    .right-enter {transform: translate3d(-100%, 0, 0)}
    .left-enter {transform: translate3d(100%, 0, 0)}
    .right-exit {transform: translate3d(0, 0, 0)}
    .left-exit {transform: translate3d(0, 0, 0)}
    .right-enter.right-enter-active {transform: translate3d(0, 0, 0); transition: all ${timeout}ms}
    .left-enter.left-enter-active {transform: translate3d(0, 0, 0); transition: all ${timeout}ms}
    .left-exit.left-exit-active {transform: translate3d(100%, 0, 0);transition: all ${timeout}ms}
    .right-exit.right-exit-active {transform: translate3d(-100%, 0, 0); transition: all ${timeout}ms}
`;

class PageSlider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.location = this.props.location.pathname;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.location = this.props.location.pathname;
    }

    render() {
        const {location} = this.props;
        return (
            <Section>
                <TransitionGroup>
                    <CSSTransition key={location.key} timeout={timeout} classNames={location.pathname === "/" ? "right" : "left"}>
                        <FlexScreen>
                            <Switch location={location}>
                                {
                                    this.props.children.map((child, i) => (
                                        !child.props.component ? child : (
                                            <Route key={i} {...{...child.props, component: null}}
                                                   render={(props) => (
                                                       props.location.pathname === document.location.pathname
                                                           ? <child.props.component key={i} {...child.props} {...props}/>
                                                           : <div/>
                                                   )}
                                            >
                                                {child.props.children}
                                            </Route>
                                        )
                                    ))
                                }
                            </Switch>
                        </FlexScreen>
                    </CSSTransition>
                </TransitionGroup>
            </Section>
        )
    }
}


export default withRouter(PageSlider);
