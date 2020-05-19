const ObjectID = require('mongodb').ObjectID;


module.exports = (app, db) => {
    app.post("/delete/", async ({body: {col, item}}, res) => {
        const _id = new ObjectID(item._id);
        delete item._id;
        const {result: {ok}} = await db.collection(col).deleteOne({_id});
        res.send({ok});
    });
};