import React from 'react';
import {FlexBox} from "../../templates/flex";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class Forgot extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {email: "", type: "forgot", ok: false, error: false};
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
                        <Typography component="h1" variant="h5">Восстановление пароля</Typography>
                        {this.state.ok ? "Пароль отправлен на email" : <form onSubmit={e => e.preventDefault() || this.props.submit(this.state, this.answer)}>
                            <TextField error={this.state.error} required fullWidth label="Email" onChange={e => this.setState({email: e.target.value})}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>Отправить</Button>
                        </form>}
                    </div>
                </Container>
            </FlexBox>
        )
    }
}
