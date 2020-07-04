import * as React from "react";
import DbGantt from "../../templates/db-gantt";
import {FlexBox} from "../../templates/flex";
import Header from "../../header/header";
import Menu from "../../menu/menu";
import HeaderTitle from "../../header/header-title";

export default class GanttPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: []};
    }

    componentDidMount() {
        this.setState({data: []});
    }

    render() {
        const start = new Date(2020,0, 1);
        const end = new Date(2020, 11, 31);

        return (
            <FlexBox>
                <Header>
                    <Menu/>
                    <HeaderTitle>{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox>
                    <DbGantt dbpath="test.gantt" start={start} end={end}/>
                </FlexBox>
            </FlexBox>
        )
    }
}
