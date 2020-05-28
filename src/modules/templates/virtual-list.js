import React from 'react';
import {Divider} from "@material-ui/core";
import {FixedSizeList} from 'react-window';
import * as PropTypes from 'prop-types';
import {FlexPullToRefresh} from "./flex";


export default class VirtualList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: 1, itemSize: 1};
        this.resize = this.resize.bind(this);
        this.renderRow = this.renderRow.bind(this);
        window.addEventListener("resize", this.resize);
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
            if (this.itemCount < data.length) {
                this.listRef.current.scrollToItem(index, "start");
            }
            if (this.itemCount && this.itemCount === data.length) {
                this.setItem[index](data[index]);
            }
        }

        this.itemCount = data.length;

        if (prevProps.template !== template || prevProps.divider !== divider) {
            this.resize();
        }
    }
    componentDidMount() {
        this.resize();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }
    resize() {
        const fix = this.listRef.current._outerRef;
        const itemSize = (r => !r ? 1 : ((h, i) => {r.style.height = null; i = r.clientHeight; r.style.height = h; return i})(r.style.height))(fix.children[0].children[0]);
        const height = (f => ((d, i) => {f.style.display = "none"; i = f.parentElement.clientHeight; f.style.display = d; return i})(f.style.display))(fix);

        this.setState({height, itemSize});
    }
    render() {
        const {height, itemSize} = this.state;

        return (
            <FlexPullToRefresh canRefresh={() => this.listRef.current._outerRef.scrollTop === 0} onRefresh={this.props.onPull}>
                <FixedSizeList ref={this.listRef} width="100%" height={height} itemSize={itemSize} itemCount={this.props.data.length}>
                    {this.renderRow}
                </FixedSizeList>
            </FlexPullToRefresh>
        )
    }
}

VirtualList.propTypes = {
    divider: PropTypes.oneOf(["fullWidth", "inset", "middle"]).isRequired,
};

