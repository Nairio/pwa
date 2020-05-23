const nodemailer = require("nodemailer");

module.exports = (app, client) => {
    const db = client.db("auth");

    app.post("/auth/", async ({body: {name, email, password, type, oldpassword, clientId}}, res) => {
        const login = ({name}) => {
            (async () => {
                const {result: {ok}} = await db.collection("clients").insertOne({email, clientId});
                res.send({ok, name, email});
            })()
        };

        if (type === "register") {
            if (!email || !name || !password || !clientId) return res.send({ok: 0});

            const [item] = await db.collection("details").find({email}).toArray();
            if (!item) {
                (async () => {
                    const {result: {ok}} = await db.collection("details").insertOne({name, email, password});
                    ok && login({name});
                })();
            } else {
                res.send({ok: 0});
            }
        }
        if (type === "login") {
            if (!email || !password) return res.send({ok: 0});

            const [item] = await db.collection("details").find({email, password}).toArray();

            if (item) {
                login(item);
            } else {
                res.send({ok: 0});
            }
        }
        if (type === "change") {
            if (!email || !password || !oldpassword) return res.send({ok: 0});

            const {result: {ok, nModified}} = await db.collection("details").updateOne({email, password: oldpassword}, {$set: {password}});
            res.send({ok: ok && nModified});
        }
        if (type === "forgot") {
            const {host, user, pass} = {host: "smtp.gmail.com", user: "ntest123q@gmail.com", pass: "1111111111q!"};

            if (!email) return res.send({ok: 0});
            const [{password} = {}] = await db.collection("details").find({email}).toArray();
            if (password) {
                const transporter = nodemailer.createTransport({host, secure: true, auth: {user, pass}});
                const info = await transporter.sendMail({from: user, to: email, subject: "Your password ✔", text: "Your password", html: `<b>Your password is: ${password}</b>`});
                res.send({ok: !!info.messageId});
            } else {
                res.send({ok: 0});
            }

        }
        if (type === "logout") {
            if (!email) return res.send({ok: 1});
            const {result: {ok}} = await db.collection("clients").deleteOne({clientId});
            res.send({ok});
        }
    });
};
