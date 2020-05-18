const config = require("./config");
const MongoClient = require("mongodb").MongoClient;

let error = false;
let db = false;

MongoClient.connect(config.mongodbURL, {useUnifiedTopology: true}, (err, client) => {
    if (err) return error = err;
    db = client.db(config.dbName);
});

module.exports = (app, success) => {
    app.use((req, res, next) => {
        if (!db && !error) return res.send("Connecting to MongoDB...");
        if (error) return res.send("MongoDB error");
        success(db);
        next()
    })
};
