import React from 'react';
import {FlexBox} from "../../templates/flex";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class Logout extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {type: "logout", ok: false, error: false};
        this.answer = this.answer.bind(this);
    }

    answer(ok) {
        this.setState({ok, error: !ok});
    }


    render() {
        return (
            <FlexBox middle>
                <Container component="main" maxWidth="xs">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <Typography component="h1" variant="h5">{this.props.auth.name}</Typography>
                        <Typography component="h2" variant="h5">{this.props.auth.email}</Typography>
                        <form onSubmit={e => e.preventDefault() || this.props.submit(this.state, this.answer)}>
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>Выйти</Button>
                        </form>
                    </div>
                </Container>
            </FlexBox>
        )
    }
}
