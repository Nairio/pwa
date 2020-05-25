import React from 'react';
import {Item, List} from "../templates/list";
import Divider from "@material-ui/core/Divider";
import {Avatar, Box, Typography} from "@material-ui/core";
import SwipeableLeftMenu from "./swipeable-left-menu";
import {settings} from "../features/settings";
import flag from "../../england.png"

export const menuItems = [];

export default class Menu extends React.Component {
    render() {
        return (
            <SwipeableLeftMenu width={250}>
                <Box m={2}>
                    <Avatar src={flag} style={{width: 100, height: 100}}/>
                    <Typography variant="body1" color="textPrimary" noWrap>{settings.title}</Typography>
                    <Typography variant="body2" color="textSecondary" noWrap>{settings.subtitle}</Typography>
                </Box>
                <Divider/>
                <List>
                    {menuItems.map((child, i) => child ? <Item key={i} {...child}/> : <Divider key={i}/>)}
                </List>
            </SwipeableLeftMenu>
        )
    }
}
