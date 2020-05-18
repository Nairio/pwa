module.exports = (app, db) => {
    app.get('/data/', async (req, res) => {
        res.send(await db.collection("data").find().toArray());
    });
    app.get('/data/new/', async (req, res) => {
        let data = db.collection("data");

        const template = (i) => ({
            "title": "Постоянный участник " + i,
            "text": "Item #" + i,
            "img": i % 2 ? "/icon.jpg" : ""
        });

        await data.drop();
        db.createCollection("data");
        data = db.collection("data");
        await data.insertMany((d => {for (let i = 1; i <= 345000; i++) d.push(template(i)); return d})([]));

        res.send("ok");

    });
};