import React from 'react';
import {CircularProgress, Divider} from "@material-ui/core";
import {FixedSizeList} from 'react-window';
import * as PropTypes from 'prop-types';
import {FlexBox, FlexPullToRefresh} from "./flex";

export default class VirtualList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {data: this.props.data};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const {index, data} = this.props;
            this.setState({data: [], changing: {index, data}});
        }

        if (this.state.changing) {
            const {data, index} = this.state.changing;
            if (data) {
                this.setState({changing: {index}, data});
            } else {
                this.setState({changing: false});
                this.scrollToIndex(index);
            }
        }
    }

    render() {
        return (
            <VirtualList2 {...this.props} data={this.state.data} scrollToIndex={func => this.scrollToIndex = func}/>
        )
    }
}

export class VirtualList2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: 0, width: 0, itemSize: 0};
        this.resize = this.resize.bind(this);
        this.renderRow = this.renderRow.bind(this);
        window.addEventListener("resize", this.resize);
        this.listRef = React.createRef();
        this.props.scrollToIndex(index => this.listRef.current && this.listRef.current.scrollToItem(index, "start"));
    }
    renderRow({style, index}) {
        const {data, divider} = this.props;
        return (
            <div style={style}>
                <this.props.template {...data[index]}/>
                <Divider variant={divider} component="div"/>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.resize();
        }
    }
    componentDidMount() {
        this.resize();
    }
    resize() {
        if (!this.parent || this.props.data.length < 1) return;

        const row = this.parent.children[0];
        const fix = this.parent.children[1];
        row.style.display = "table";
        fix.style.display = "none";
        this.setState({
            height: this.parent.clientHeight,
            width: this.parent.clientWidth,
            itemSize: row.clientHeight,
        });
        row.style.display = "none";
        fix.style.display = "";
    }
    render() {
        if (!this.props.data) return <FlexBox center middle><CircularProgress/></FlexBox>;
        return (
            <FlexPullToRefresh canRefresh={() => this.listRef.current._outerRef.scrollTop === 0} onRefresh={this.props.onPull}>
                <FlexBox elementDOM={el => this.parent = el}>
                    <this.renderRow data={[{}]} index={0} style={{display: "none", padding: 0}}/>
                    <FixedSizeList ref={this.listRef} width={this.state.width} height={this.state.height} itemSize={this.state.itemSize} itemCount={this.props.data.length}>
                        {this.renderRow}
                    </FixedSizeList>
                </FlexBox>
            </FlexPullToRefresh>
        )
    }
}

VirtualList.propTypes = {
    divider: PropTypes.oneOf(["fullWidth", "inset", "middle"]).isRequired,
};

