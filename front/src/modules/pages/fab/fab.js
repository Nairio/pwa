import React from 'react';
import HeaderTitle from "../../header/header-title";
import Header from "../../header/header";


import GoHome from "../../header/go-home";
import {FlexBox} from "../../templates/flex";
import FabRightBottom from "../../templates/fab-right-bottom";
import AddIcon from '@material-ui/icons/Add';



export default class Fab extends React.Component {
    render() {
        return (
            <FlexBox>
                <Header>
                    <GoHome/>
                    <HeaderTitle align="left">{this.props.title}</HeaderTitle>
                </Header>
                <FlexBox middle center>
                    <FabRightBottom color="secondary" >
                        <AddIcon/>
                    </FabRightBottom>
                </FlexBox>
            </FlexBox>
        )
    }
}
