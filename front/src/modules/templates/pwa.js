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
        this.routes = [];

        const pages = this.props.children;

        pages.forEach((page) => page.props && (({title, icon, path}) => title ? (icon && menuItems.push({title, icon, path})) : menuItems.push(0))(page.props));
        pages.forEach((page, i) => page.props && (({path, component: Component, title, children: Slider, render: Render}) => {
            if (Component || Slider || Render) {
                let onSubmit = () => {};
                Render && (Render = <Render/>);
                Component && (Component = <Component {...page.props} onSubmit={func => onSubmit = func}/>);
                Slider && (Slider = React.cloneElement(Slider, {submit: (...args) => onSubmit(...args)}));

                this.routes.push(<Route key={i} path={path} title={title} exact component={() => <FlexBox>{Render}{Component}{Slider}</FlexBox>}/>)
            }
        })(page.props));
        this.routes.push(<Route key={pages.length} status={404} render={() => <Header><GoHome/><HeaderTitle>Error 404</HeaderTitle></Header>}/>);

        settings.appId = this.props.appId;
        settings.title = this.props.title;
        settings.subtitle = this.props.subtitle;
        settings.server = this.props.server;
    }

    render() {
        return (
            <ErrorBoundary>
                {/*<React.StrictMode>*/}
                <Router history={history}>
                    <FlexScreen>
                        <FlexBox>
                            <PageSlider>
                                {this.routes}
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

