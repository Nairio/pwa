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


export default class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={email:"", password: "", type: "login"};
        this.answer = this.answer.bind(this);
    }

    answer(data) {
        console.log(data)
    }

    render() {
       return (
            <FlexBox middle>
                <Container component="main" maxWidth="xs">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar><LockOutlinedIcon/></Avatar>
                        <Typography component="h1" variant="h5">Вход </Typography>
                        <form onSubmit={e => e.preventDefault() || this.props.submit(this.state, this.answer)}>
                            <TextField error={this.props.error} variant="outlined" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" autoFocus onChange={e => this.setState({email: e.target.value})}/>
                            <TextField error={this.props.error} variant="outlined" margin="normal" required fullWidth name="password" label="Пароль" type="password" autoComplete="current-password" onChange={e => this.setState({password: e.target.value})}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>Войти</Button>
                            <Grid container>
                                <Grid item xs><Link href="#" onClick={e => e.preventDefault() || this.props.switch(2)} variant="button">Забыли пароль?</Link></Grid>
                                <Grid item><Link href="#" onClick={e => e.preventDefault() || this.props.switch(1)} variant="body2">Зарегистрироваться!</Link></Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </FlexBox>
        )
    }
}
