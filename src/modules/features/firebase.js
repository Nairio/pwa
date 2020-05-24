import {settings} from "./settings";
import {storage} from "./localstorage";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB35ZOMGeY2pkToH7I6vdbvPuxQQq8FCoU",
    authDomain: "pwa-nairio-com.firebaseapp.com",
    databaseURL: "https://pwa-nairio-com.firebaseio.com",
    projectId: "pwa-nairio-com",
    storageBucket: "pwa-nairio-com.appspot.com",
    messagingSenderId: "382627736494",
    appId: "1:382627736494:web:aa0e9ba556a7096b73b63f",
    measurementId: "G-T68PVDK68Y"
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
            request("getAll", {col, added, modified, deleted}).then(d => {
                data = d;
                index = 0
            }).then(onChange)
        },
        close: () => {
            onData = () => {
            }
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

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
auth.onAuthStateChanged((user) => storage("auth", user ? {email: user.email, name: user.displayName} : false));

export const Auth = async ({email, oldpassword, password, type, name}) => {
    try {
        if (type === "register") {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({displayName: name});
        }
        if (type === "login") {
            const {user} = await auth.signInWithEmailAndPassword(email, password);
            name = user.displayName
        }
        if (type === "logout") {
            await auth.signOut();
            storage("auth",  false);
            storage("data",  false);
        }
        if (type === "forgot") {
            await auth.sendPasswordResetEmail(email);
        }
        if (type === "change") {
            const {user} = await auth.signInWithEmailAndPassword(auth.currentUser.email, oldpassword);
            await user.updatePassword(password);
        }
        return {ok: 1, name, email}
    } catch (e) {
        return {ok: 0}
    }
};


export const request = (method, {col, item, added, modified, deleted}) => {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            try {
                item = (d => {for (const i in d) d[i] === undefined && (delete d[i]); return d})(item);

                const db = firebase.firestore().collection(settings.appId).doc(col).collection(user.email);

                if (method === "add") {
                    delete item._id;
                    const doc = await db.add(item);
                    resolve({ok: 1, _id: doc.id});
                }

                if (method === "change") {
                    await db.doc(item._id).set(item);
                    resolve({ok: 1});
                }

                if (method === "delete") {
                    await db.doc(item._id).delete();
                    resolve({ok: 1});
                }

                if (method === "getAll") {

                    for (const i in added) {
                        const item = added[i];
                        delete item._id;
                        delete item.added;
                        delete item.modified;
                        await db.add(item)
                    }

                    for (const i in modified) {
                        const item = modified[i];
                        delete item.modified;
                        await db.doc(item._id).set(item)
                    }

                    for (const i in deleted) {
                        const item = deleted[i];
                        await db.doc(item._id).delete()
                    }

                    resolve((await db.get()).docs.reduce((s, doc) => s.concat({...doc.data(), _id: doc.id}), []));
                }
            } catch (e) {
                resolve({ok: 0});
            }
        });
    })

};