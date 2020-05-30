import {settings} from "./settings";
import {storage} from "./localstorage";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

auth.onAuthStateChanged((user) => storage("auth", user ? {email: user.email, name: user.displayName} : false));

firebase.firestore().settings({cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED});
firebase.firestore().enablePersistence();
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
            storage("auth", false);
            storage("data", false);
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

const user = {get: (cb) => user.u ? cb(user.u) : auth.onAuthStateChanged(u => u && cb(user.u = u))};

export const DB = (col, onData) => {
    let index = 0;
    let _sort = 0;
    let data = [];

    const filter = {t: "", set: (t, cb) => cb(filter.t = t.toLowerCase()), do: d => filter.t ? d.filter(({_sort, _id, ...i}) => Object.values(i).join(" ").toLowerCase().includes(filter.t)) : d};
    const getFirestoreDB = (cb) => user.get((user) => cb(firebase.firestore().collection(settings.appId).doc(user.email).collection(col)));

    getFirestoreDB((db) => db.orderBy("_sort", "asc").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(({type, doc}) => {
            const item = {...doc.data(), _id: doc.id};

            _sort = Math.max(_sort, item._sort);

            if (type === "added") {
                index = data.push(item) - 1;
            }
            if (type === "modified") {
                index = data.findIndex(({_id}) => _id === doc.id);
                data[index] = item;
            }
            if (type === "removed") {
                index = data.findIndex(({_id}) => _id === doc.id);
                data.splice(index, 1);
            }
        });
        onData({data: filter.do(data), index});
    }));

    return {
        close: () => {onData = () => {}},
        load: () => getFirestoreDB((db) => db.get()),
        add: (item) => getFirestoreDB((db) => db.add({...item, _sort: _sort + 1})),
        change: ({_id, ...item}) => getFirestoreDB((db) => db.doc(_id).set(item)),
        delete: ({_id, title}) => window.confirm(`Удалить "${title}"?`) && getFirestoreDB((db) => db.doc(_id).delete()),
        filter: (term) => filter.set(term, () => onData({data: filter.do(data), index: 0}))
    }
};

export const FBStorage = (file, onError, onProgress, onSuccess) => {
    user.get((user) => {
        const name = (n => {n.splice(n.length > 1 ? -1 : 1, 0, new Date().getTime());return n.join(".")})(file.name.split("."));
        const filename = `${settings.appId}/${user.email}/${name}`;
        const uploadTask = firebase.storage().ref().child(filename).put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => onProgress(Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)), onError, () => uploadTask.snapshot.ref.getDownloadURL().then(onSuccess));
    });
};
