import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {DB} from "../features/firebase";


export default function AutocompleteSelect({defaultValue, name, dbpath, dblabel, ...props}) {
    const [item, setItem] = React.useState({_id: ""});
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;
        DB(dbpath, ({data}) => {
            (d => d.length > 0 && setItem(d[0]))(data.filter(d => d._id === defaultValue));
            active && setOptions(data)
        }).load();
        return () => {active = false};
    }, [dbpath, defaultValue, loading]);

   // React.useEffect(() => {!open && setOptions([])}, [open]);

    return (
        <React.Fragment>
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onChange={(event, newValue) => setItem(newValue)}
                getOptionSelected={(option, value) => option._id === value._id}
                getOptionLabel={(option) => typeof dblabel==="function" ? dblabel(option) : option[dblabel]}
                options={options}
                loading={loading}
                value={item}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...props}
                        InputProps={{...params.InputProps,
                            endAdornment: <React.Fragment>{loading && <CircularProgress color="inherit" size={20}/>}{params.InputProps.endAdornment}</React.Fragment>
                        }}
                    />
                )}
            />
            <input type="hidden" name={name} value={item._id} onChange={() => {}}/>
        </React.Fragment>
    );
}
