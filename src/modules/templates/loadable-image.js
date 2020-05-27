import React from "react";
import ImageIcon from '@material-ui/icons/Image';
import {FlexBox} from "./flex";
import {FBStorage} from "../features/firebase";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import IconButton from "@material-ui/core/IconButton";
import FullScreen from "./fullscreen";

export class LoadableImage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {url: this.props.src || "", progress: -1, error: false, zoom: false};
        this.onFile = this.onFile.bind(this);
    }


    onFile() {
        ((el) => {
            el.type = "file";
            el.accept = "image/*";
            el.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                FBStorage(file,
                    (error) => this.setState({error}),
                    (progress) => this.setState({progress}),
                    (url) => this.setState({url, progress: -1}),
                );
                el.remove();
                const reader = new FileReader();
                reader.onloadend = () => {};
                reader.readAsDataURL(file);

            };
            el.click();
        })(document.body.appendChild(document.createElement("input")))
    }


    render() {
        const {progress, error, url, zoom} = this.state;
        const isError = error;
        const isProgress = !isError && progress > -1 && progress < 101;
        const isImage = !isProgress && url;
        const isNoImage = !isProgress && !url;


        return (
            <FlexBox middle center>
                <FullScreen open={zoom} onClose={() => this.setState({zoom: false})}>
                    <FlexBox middle center>
                        <img src={url} style={{width: "100%"}} alt={this.props.title}/>
                    </FlexBox>
                </FullScreen>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs>
                        <TextField fullWidth name={this.props.name} label={this.props.title} value={url} onChange={e => this.setState({url: e.target.value})}/>
                    </Grid>
                    <Grid item>
                        <IconButton color="secondary" onClick={this.onFile}>
                            <ImageSearchIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item style={{alignItems: "center", justifyContent: "center", display: "flex", padding: 0, margin: 8, height: 43, width: 43}}>
                        {isError && <span>ERROR</span>}
                        {isProgress && <span>{progress}%</span>}
                        {isImage && <div onClick={() => this.setState({zoom: true})} style={{width: "100%", height: "100%", borderRadius: "50%", backgroundPosition: "50% 50%", backgroundSize: "cover", backgroundImage: `url(${url})`}}/>}
                        {isNoImage && <ImageIcon/>}
                    </Grid>
                </Grid>
            </FlexBox>
        )
    }
}



