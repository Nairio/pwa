const ObjectID = require('mongodb').ObjectID;


module.exports = (app, client) => {
    app.post("/change/", async ({body: {appId, col, item, clientId}}, res) => {
        const db = client.db(appId);

        const _id = new ObjectID(item._id);
        delete item._id;

        item._email = (await client.db("auth").collection("clients").find({clientId}).toArray())[0].email;

        const {result: {ok}} = await db.collection(col).updateOne({_id}, {$set: item});
        res.send({ok});
    });
};