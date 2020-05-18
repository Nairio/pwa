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
        this.state={email: "", type: "forgot"};
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
                        <Typography component="h1" variant="h5">Восстановление пароля</Typography>
                        <form onSubmit={e => e.preventDefault() || this.props.submit(this.state, this.answer)}>
                            <TextField variant="outlined" margin="normal" required fullWidth label="Email" name="email" autoComplete="email" onChange={e => this.setState({email: e.target.value})}/>
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>Отправить</Button>
                        </form>
                    </div>
                </Container>
            </FlexBox>
        )
    }
}
