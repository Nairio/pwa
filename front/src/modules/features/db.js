import {settings} from "./settings";
import {storage} from "./localstorage";
import {getClientId} from "./client";


const clientId = getClientId();

export const request = (method, data) => {
    return fetch(
        settings.server + "/" + method + "/",
        {method: "POST", body: JSON.stringify({appId: settings.appId, clientId, ...data})}
    ).then(res => res.json())
};


export const DB = (col, onData) => {
    let data = [];
    let index = 0;
    let term = "";

    const onChange = () => {
        storage("data", data);
        onData({data: filter(data), index});
    };

    const filter = () => term ? data.filter(({title, text}) => (title + " " + text).toLowerCase().includes(term.toLowerCase())) : data;

    return {
        load: () => {
            data = storage("data") || [];

            const added = data.filter(d => d.added && !d.deleted);
            const modified = data.filter(d => d.modified && !d.deleted && !d.added);
            const deleted = data.filter(d => d.deleted);

            onChange();
            request("getAll", {col, added, modified, deleted}).then(d => data = d).then(onChange)
        },
        close: () => {
            onData = () => {}
        },
        add: (item) => {
            item = {...item, added: true};
            index = data.length;
            data = data.concat(item);
            onChange();

            request("add", {col, item: {...item, added: undefined}}).then(({ok, _id}) => {
                if (ok === 1) {
                    delete item.added;
                    index = data.findIndex(({_id}) => _id === item._id);
                    data = data.map((d) => d._id === item._id ? {...item, _id} : d);
                    onChange();
                }
            });
        },
        change: (item) => {
            item = {...item, modified: true};
            index = data.findIndex(({_id}) => _id === item._id);
            data = data.map((d) => d._id === item._id ? item : d);
            onChange();

            request("change", {col, item: {...item, modified: undefined}}).then(({ok}) => {
                if (ok === 1) {
                    delete item.modified;
                    index = data.findIndex(({_id}) => _id === item._id);
                    data = data.map((d) => d._id === item._id ? item : d);
                    onChange();
                }
            });
        },
        delete: (item) => {
            if (!window.confirm(`Удалить "${item.title}"?`)) return;
            item = {...item, deleted: true};
            index = data.findIndex(({_id}) => _id === item._id);
            data = data.map((d) => d._id === item._id ? item : d);
            onChange();

            request("delete", {col, item: {...item, deleted: undefined}}).then(({ok}) => {
                if (ok === 1) {
                    delete item.deleted;
                    index = data.findIndex(({_id}) => _id === item._id);
                    data = data.filter(({_id}) => _id !== item._id);
                    onChange();
                }
            });
        },
        filter: (t) => {
            term = t;
            onChange();
        }
    }
};