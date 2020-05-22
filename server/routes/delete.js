const ObjectID = require('mongodb').ObjectID;


module.exports = (app, client) => {
    app.post("/delete/", async ({body: {appId, col, item, clientId}}, res) => {
        const db = client.db(appId);

        const _id = new ObjectID(item._id);
        delete item._id;
        const {result: {ok}} = await db.collection(col).deleteOne({_id});
        res.send({ok});
    });
};