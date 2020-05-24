import {storage} from "./localstorage";


export const getClientId = (update) => {
    if(!storage("clientId") || update) {
        storage("clientId", Math.random().toString(16).slice(2));
    }
    return storage("clientId");
};

