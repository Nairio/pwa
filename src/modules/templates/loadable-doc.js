import React from "react";
import {FlexBox} from "./flex";
import {FBStorage} from "../features/firebase";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FullScreen from "./fullscreen";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export class LoadableDoc extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {url: this.props.src || "", progress: -1, error: false, zoom: false};
        this.onFile = this.onFile.bind(this);
    }


    onFile() {
        ((el) => {
            el.type = "file";
            el.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                FBStorage(file,
                    (error) => this.setState({error}),
                    (progress) => this.setState({progress}),
                    (url) => this.setState({url, progress: -1}),
                );
                el.remove();
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
                        {this.props.title}
                        <input type={"hidden"}  autoComplete="off" name={this.props.name} value={url} onChange={e => this.setState({url: e.target.value})}/>
                        <hr/>
                    </Grid>
                    <Grid item>
                        <IconButton title="Upload" color="secondary" onClick={this.onFile}>
                            <CloudUploadIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item style={{alignItems: "center", justifyContent: "center", display: "flex", padding: 0, margin: 8, height: 43, width: 43}}>
                        {isError && <span>ERROR</span>}
                        {isProgress && <span>{progress}%</span>}
                        {isImage && <a title="Download" target="_blank" rel="noopener noreferrer" href={url} download><CloudDownloadIcon/></a>}
                        {isNoImage && <CloudUploadIcon/>}
                    </Grid>
                </Grid>
            </FlexBox>
        )
    }
}



