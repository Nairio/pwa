module.exports = (app, db) => {
    app.post("/add/", async ({body: {col, item}}, res) => {
        delete item._id;
        const {result: {ok}, ops: [{_id}]} = await db.collection(col).insertOne(item);
        res.send({ok, _id});
    });
};