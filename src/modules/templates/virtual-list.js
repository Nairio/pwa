import React from 'react';
import {CircularProgress, Divider} from "@material-ui/core";
import {FixedSizeList} from 'react-window';
import * as PropTypes from 'prop-types';
import {FlexBox, FlexPullToRefresh} from "./flex";


export default class VirtualList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: 0, width: 0, itemSize: 0};
        this.resize = this.resize.bind(this);
        this.renderRow = this.renderRow.bind(this);
        window.addEventListener("resize", () => this.resize());
        this.listRef = React.createRef();
        this.setItem = {};
        this.itemCount = 0;
    }
    renderRow({style, index}) {
        const {data, divider} = this.props;

        const [item, setItem] = React.useState(data[index]);
        this.setItem[index] = setItem;
        item !== data[index] && setItem(data[index]);

        return (
            <div style={style}>
                <this.props.template {...item}/>
                <Divider variant={divider} component="div"/>
            </div>
        )
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {template, divider, data, modified, index} = this.props;


        if (prevProps.modified !== modified) {

            if (this.itemCount > data.length) {
                this.setItem[index] = () => {}
            }

            if (this.itemCount < data.length) {
                this.listRef.current.scrollToItem(index, "start");
            }

            if (this.itemCount === data.length) {
                this.setItem[index](data[index]);
            }

            this.itemCount = data.length;
        }

        if (prevProps.template !== template || prevProps.divider !== divider) {
            this.resize();
        }


    }
    componentDidMount() {
        this.resize();
    }
    componentWillUnmount() {
        this.resize = () => {}
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
            itemSize: row.clientHeight
        });
        row.style.display = "none";
        fix.style.display = "";
    }

    render() {
        const {width, height, itemSize} = this.state;

        if (!this.props.data) return <FlexBox center middle><CircularProgress/></FlexBox>;
        return (
            <FlexPullToRefresh canRefresh={() => this.listRef.current._outerRef.scrollTop === 0} onRefresh={this.props.onPull}>
                <FlexBox elementDOM={el => {!this.parent && this.resize(this.parent = el)}}>
                    <this.renderRow data={[{}]} index={-1} style={{display: "none", padding: 0}}/>
                    <FixedSizeList ref={this.listRef} width={width} height={height} itemSize={itemSize} itemCount={this.props.data.length}>
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

