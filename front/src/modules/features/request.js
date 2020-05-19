import {settings} from "./settings";

export const request = (method, data) => {
    return fetch(
        settings.server + "/" + method + "/",
        {method: "POST", body: JSON.stringify({appId: settings.appId, token: settings.token, ...data})}
    ).then(res => res.json())
};


