import React from 'react';
import {colors, IconButton, Grid} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import {storage} from "./localstorage";


export default class Install extends React.Component {
    constructor(props) {
        super(props);
        this.deferredPrompt = false;
        this.installHandler = this.installHandler.bind(this);
        this.state = {open: false, installing: false};

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === "accepted") {
                    this.setState({open: false})
                } else {
                    this.setState({installing: false})
                }
            }, () => {
                this.setState({installing: false})
            });
            this.setState({open: true, installing: false});
        });

        window.addEventListener('appinstalled', () => {
            storage("appinstalled", true);
        });


    }

    installHandler() {
        if (!this.state.installing) {
            this.setState({installing: true});
            this.deferredPrompt.prompt();
        }
    };


    render() {
        return (
            <div className="Install">
                <Grid container style={{
                    display: this.state.open ? "flex" : "none",
                    lineHeight: 0,
                    cursor: "pointer",
                    color: colors.common.white,
                    backgroundColor: colors.green[600],
                    position: "fixed",
                    width: "100%",
                    bottom: 0
                }}>
                    <Grid item xs container justify="center" alignItems="center" spacing={1} onClick={this.installHandler}>
                        <Grid item><CheckCircleIcon/></Grid>
                        <Grid item>{this.state.installing ? "Идёт установка..." : "Установить приложение"}</Grid>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" onClick={() => this.setState({open: false})}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}







