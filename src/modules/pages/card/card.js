import React from 'react';
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";

import {settings} from "../../features/settings";
import {Card as MUICard, CardActionArea, CardContent, CardMedia, Typography} from "@material-ui/core";
import GoHome from "../../header/go-home";
import {FlexBox} from "../../templates/flex";


export default class Card extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox middle center>
                    <MUICard style={{width:200}}>
                        <CardActionArea>
                            <CardMedia component="img" alt="" image="/icon.jpg" title=""/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{settings.title}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{settings.subtitle} </Typography>
                            </CardContent>
                        </CardActionArea>
                    </MUICard>
                </FlexBox>
            </FlexBox>
        )
    }
}
