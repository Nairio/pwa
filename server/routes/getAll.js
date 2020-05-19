module.exports = (app, db) => {

    app.post("/getAll/", async ({body: {col}}, res) => {
        res.send(await db.collection(col).find().toArray());
    });

};