const MongoClient = require("mongodb").MongoClient;


module.exports = (app) => {
    app.get('/db/new/', async (req, res) => {
        const db = MongoClient.db("pwa");
        db.createCollection("data");

        let data = await db.collection("data");

        const template = (i) => ({
            "title": "Постоянный участник " + i,
            "text": "Item #" + i,
            "img": i % 2 ? "/icon.jpg" : ""
        });

        await data.drop();
        db.createCollection("data");
        data = await db.collection("data");
        await data.insertMany((d => {for (let i = 1; i <= 345000; i++) d.push(template(i)); return d})([]));

        res.send({result: "ok"});

    });
};