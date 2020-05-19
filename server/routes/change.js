const ObjectID = require('mongodb').ObjectID;


module.exports = (app, db) => {
    app.post("/change/", async ({body: {col, item}}, res) => {
        const _id = new ObjectID(item._id);
        delete item._id;
        const {result: {ok}} = await db.collection(col).updateOne({_id}, {$set: item});
        res.send({ok});
    });
};