import React from 'react';
import history from "../features/history";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {ListItemIcon, Typography} from "@material-ui/core";
import MUIList from "@material-ui/core/List";
import {Box} from "@material-ui/core";

export class Item extends React.Component {
    render() {
        return (
            <ListItem {...this.props} button onClick={this.props.onClick}>
                <ListItemIcon>{this.props.icon}</ListItemIcon>
                <Typography variant="inherit">{this.props.title}</Typography>
            </ListItem>
        )
    }
}
export class List extends React.Component {
    render() {
        let items = this.props.children;
        if (!items) return false;
        if (!items.map) items = [items];
        const lists = [[]];
        items.map((child, i) => {
            if (child.props.title || child.props.icon) {
                lists[lists.length - 1].push(
                    <Item key={i} {...child.props} onClick={() =>
                        child.props.path
                            ? history.replace(child.props.path)
                            : child.props.onClick && child.props.onClick()}>{child.props.children}
                    </Item>
                )
            } else {
                lists.push(null);
                lists.push([]);
            }
            return false;
        });
        const Wrapper = this.props.box ? Box : MUIList;
        return (
            <React.Fragment>
                {
                    lists.map((list, i) =>
                        list ? <Wrapper key={i}>{list}</Wrapper> : <Divider key={i}/>
                    )
                }
            </React.Fragment>
        )
    }
}
