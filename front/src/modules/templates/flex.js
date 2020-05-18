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
        return <div ref={this.props.elementDOM} className={classes.join(" ")} style={this.props.style}>{this.props.children}</div>
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


