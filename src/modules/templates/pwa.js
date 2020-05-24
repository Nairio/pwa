import React from "react";

import {Router} from 'react-router-dom';
import {Route} from "react-router-dom";

import {menuItems} from "../menu/menu";
import Header from "../header/header";
import GoHome from "../header/go-home";
import HeaderTitle from "../header/header-title";
import {settings} from "../features/settings";
import {ErrorBoundary} from "../features/errors";
import history from "../features/history";
import {FlexBar, FlexBox, FlexScreen} from "./flex";
import PageSlider from "../menu/page-slider";
import Install from "../features/install";


export class Page extends React.Component {render() {return false}}
export class Slide extends React.Component {render() {return false}}

export class PWA extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {routes: []};
        this.init = this.init.bind(this);
    }

    init() {
        const routes = [];

        const pages = this.props.children;

        menuItems.length = 0;

        pages.forEach((page) => page.props && !page.props.disabled && (({title, icon, path}) => title ? (icon && menuItems.push({title, icon, path})) : menuItems.push(0))(page.props));
        pages.forEach((page, i) => page.props && !page.props.disabled && (({path, component: Component, title, children: Slider, render: Render}) => {
            if (Component || Slider || Render) {
                let onSubmit = () => {};
                Render && (Render = <Render/>);
                Component && (Component = <Component {...page.props} onSubmit={func => onSubmit = func}/>);
                Slider && (Slider = React.cloneElement(Slider, {submit: (...args) => onSubmit(...args)}));

                routes.push(<Route key={i} path={path} title={title} exact component={() => <FlexBox>{Render}{Component}{Slider}</FlexBox>}/>)
            }
        })(page.props));
        routes.push(<Route key={pages.length} status={404} render={() => <Header><GoHome/><HeaderTitle>Error 404</HeaderTitle></Header>}/>);

        this.setState({routes});

        settings.appId = this.props.appId;
        settings.title = this.props.title;
        settings.subtitle = this.props.subtitle;
        settings.server = this.props.server;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.init()
        }
    }

    componentDidMount() {
        this.init()
    }

    render() {
        return (
            <ErrorBoundary>
                {/*<React.StrictMode>*/}
                <Router history={history}>
                    <FlexScreen>
                        <FlexBox>
                            <PageSlider>
                                {this.state.routes}
                            </PageSlider>
                        </FlexBox>
                        <FlexBar>
                            <Install/>
                        </FlexBar>
                    </FlexScreen>
                </Router>
                {/*</React.StrictMode>*/}
            </ErrorBoundary>

        )
    }
}

