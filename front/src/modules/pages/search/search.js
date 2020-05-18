import React from 'react';
import {FlexBox, FlexScroll} from "../../templates/flex";
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";
import Search from "../../header/search";
import GoHome from "../../header/go-home";

export default class SearchPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {term: ""}
    }

    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                    <Search onChange={term => this.setState({term})}/>
                </Header>
                <FlexScroll>
                    <FlexBox center middle>
                        <h1>{this.props.title}: {this.state.term}</h1>
                    </FlexBox>
                </FlexScroll>
            </FlexBox>
        )
    }
}
