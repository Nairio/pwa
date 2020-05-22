module.exports = (app, client) => {
    app.post("/add/", async ({body: {appId, col, item, clientId}}, res) => {
        const db = client.db(appId);
        delete item._id;

        item._email = (await client.db("auth").collection("clients").find({clientId}).toArray())[0].email;
        const {result: {ok}, ops: [{_id}]} = await db.collection(col).insertOne(item);
        res.send({ok, _id});
    });
};