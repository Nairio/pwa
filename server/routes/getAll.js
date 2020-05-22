const ObjectID = require('mongodb').ObjectID;

module.exports = (app, client) => {
    app.post("/getAll/", async ({body: {appId, col, modified, deleted, added, clientId}}, res) => {
        const db = client.db(appId);

        const [{email: _email} = {}] = await client.db("auth").collection("clients").find({clientId}).toArray();

        modified = modified.map(m => {const _id = new ObjectID(m._id); delete m._id; delete m.modified; return {updateOne: {filter: {_id}, update: {...m, _email}}}});
        deleted = deleted.map(m => ({deleteOne: {filter: {_id: new ObjectID(m._id)}}}));
        added = added.map(m => {delete m._id; delete m.added; delete m.modified; return {insertOne: {document: {...m, _email}}}});

        modified = modified.concat(deleted).concat(added);
        modified.length && await db.collection(col).bulkWrite(modified);

        res.send(await db.collection(col).find({_email}).toArray());
    });
};