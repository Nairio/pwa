import React from 'react';

export class FlexScreen extends React.Component {
    render() {
        return <div className="Flex Box Screen" style={this.props.style}>{this.props.children}</div>
    }
}

export class FlexBar extends React.Component {
    render() {
        let classes = ["Flex"];
        this.props.center && classes.push("Middle");
        this.props.left && classes.push("Top");
        this.props.right && classes.push("Bottom");
        return <div className={classes.join(" ")} style={this.props.style}>{this.props.children}</div>
    }
}

export class FlexBox extends React.Component {
    render() {
        let classes = ["Flex", "Box"];
        this.props.center && classes.push("Center");
        this.props.middle && classes.push("Middle");
        this.props.left && classes.push("Left");
        this.props.right && classes.push("Right");
        this.props.top && classes.push("Top");
        this.props.bottom && classes.push("Bottom");

        const p = (p => {["center", "middle", "left", "right", "top", "bottom", "elementDOM"].map(k => delete p[k]); return p})({...this.props});

        return <div ref={this.props.elementDOM} className={classes.join(" ")} {...p}>{this.props.children}</div>
    }
}

export class FlexScroll extends React.Component {
    render() {
        return (
            <FlexBox style={{overflowY: "auto", height: 1}}>
                {this.props.children}
            </FlexBox>
        )
    }
}

export class FlexPullToRefresh extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.start = this.start.bind(this);
        this.move = this.move.bind(this);
        this.end = this.end.bind(this);
        this.y = 0;
        this.state = {marginTop: 0};
    }

    start({touches: [{screenY: y}]}) {
        this.y = y;
    }

    move({touches: [{screenY: y}]}) {
        const delta = y - this.y;
        const marginTop = this.props.canRefresh && this.props.canRefresh() && this.props.onRefresh && delta > 0 ? delta / 2 : 0;
        this.setState({marginTop});
    }

    end() {
        const {marginTop} = this.state;
        this.y = 0;
        this.setState({marginTop: 0});
        marginTop && this.props.onRefresh();
    }


    render() {
        const {marginTop} = this.state;
        return (
            <FlexBox style={{marginTop}} onTouchStart={this.start} onTouchMove={this.move} onTouchEnd={this.end}>
                {this.props.children}
            </FlexBox>
        )
    }
}


