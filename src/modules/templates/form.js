import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";

import * as PropTypes from "prop-types";
import {LoadableImage} from "./loadable-image";
import AutocompleteSelect from "./autocomplete-select";

export const Field = () => false;

Field.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["hidden", "disabled", "image", "text", "date", "time", "dbautocomplete"]).isRequired,
};


export class Form extends React.Component{
    render() {
        let autoFocus = true;
        const items = [];
        this.props.children.forEach(({props: {id, type, title, dbpath, dblabel}}) => items.push({id, type, title, dbpath, dblabel}));
        Object.entries(this.props.item).forEach(([id, value]) => (i => i >= 0 ? items[i].value = value : items.push({id, type: "hidden", title: id, value}))(items.findIndex((item) => item.id === id)));
        return (
            <form style={{margin: 16}} onSubmit={e => e.preventDefault() || this.props.onSubmit({...this.props.item, ...Object.fromEntries(new FormData(e.target))})}>
                {items.map(({id, type, title, value, dbpath, dblabel}) => (
                    <React.Fragment key={id}>
                        {type === "disabled" && <TextField disabled autoComplete="off" fullWidth name={id} label={title} defaultValue={value}/>}
                        {type === "image" && <LoadableImage src={value} name={id} title={title}/>}
                        {type === "text" && <TextField name={id} label={title} type="text" fullWidth defaultValue={value} autoComplete="off" autoFocus={autoFocus}/>}
                        {type === "date" && <TextField name={id} label={title} type="date" fullWidth defaultValue={value} autoComplete="off" InputLabelProps={{shrink: true}}/>}
                        {type === "time" && <TextField name={id} label={title} type="time" fullWidth defaultValue={value} autoComplete="off" InputLabelProps={{shrink: true}}/>}
                        {type === "dbautocomplete" && <AutocompleteSelect dbpath={dbpath} dblabel={dblabel} name={id} label={title} fullWidth defaultValue={value} autoComplete="off"/>}
                        {type === "text" && (autoFocus = false)}
                    </React.Fragment>
                ))}
                <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>OK</Button>
            </form>
        )
    }
}