import React from 'react';
import {FlexBox} from "../../templates/flex";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={name: "", email: "", password: "", type: "register", ok: false, error: false};
        this.answer = this.answer.bind(this);
    }

    answer(ok, callBack) {
        this.setState({ok, error: !ok});
        ok && callBack();
    }


    render() {
        return (
            <FlexBox middle>
                <Container component="main" maxWidth="xs">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <Typography component="h1" variant="h5">Регистрация</Typography>
                        <form onSubmit={e => e.preventDefault() || this.props.submit(this.state, this.answer)}>
                            <TextField variant="outlined" margin="normal" required fullWidth id="name" label="ФИО" name="name" autoComplete="name" onChange={e => this.setState({name: e.target.value})}/>
                            <TextField error={this.state.error} variant="outlined" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" onChange={e => this.setState({email: e.target.value})}/>
                            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Пароль" type="password" autoComplete="current-password" onChange={e => this.setState({password: e.target.value})}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>Зарегистрировать</Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item><Link href="#" onClick={e => e.preventDefault() || this.props.switch(0)} variant="body2">Войти!</Link></Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </FlexBox>
        )
    }
}
