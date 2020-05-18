import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import * as PropTypes from "prop-types";

export const Field = () => false;

Field.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["hidden", "disabled", "image", "text"]).isRequired,
};


export class Form extends React.Component{
    render() {
        const items = [];
        this.props.children.forEach(({props: {id, type, title}}) => items.push({id, type, title}));
        Object.entries(this.props.item).forEach(([id, value]) => (i => i >= 0 ? items[i].value = value : items.push({id, type: "text", title: id, value}))(items.findIndex((item) => item.id === id)));
        return (
            <form style={{margin: 16}} onSubmit={e => e.preventDefault() || this.props.onSubmit({...this.props.item, ...Object.fromEntries(new FormData(e.target))})}>
                {items.map(({id, type, title, value}) => (
                    <React.Fragment key={id}>
                        {type === "disabled" && <TextField disabled autoComplete="off" fullWidth autoFocus name={id} label={title} defaultValue={value}/>}
                        {type === "image" && value && <img alt={title} src={value}/>}
                        {type === "text" && <TextField autoComplete="off" fullWidth autoFocus name={id} label={title} defaultValue={value}/>}
                    </React.Fragment>
                ))}
                <Button type="submit" fullWidth variant="contained" color="primary" style={{margin: "16px 0"}}>OK</Button>
            </form>
        )
    }
}