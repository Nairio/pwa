import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Header from "../header/header";


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default class FullScreen extends React.Component {
    render() {
        const {open, title, onClose} = this.props;
        return (
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                <Header>
                    <IconButton edge="start" color="inherit" onClick={onClose}><CloseIcon/></IconButton>
                    <Typography variant="h6">{title}</Typography>
                </Header>
                {this.props.children}
            </Dialog>
        )
    }
}
