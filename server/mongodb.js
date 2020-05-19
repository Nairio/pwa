const config = require("./config");
const MongoClient = require("mongodb").MongoClient;

let error = false;
let client = false;

MongoClient.connect(config.mongodbURL, {useUnifiedTopology: true}, (err, cl) => {
    if (err) return error = err;
    client = cl;
});

module.exports = (app, success) => {
    app.use(({body: {appId}}, res, next) => {
        if (!client && !error) return res.send("Connecting to MongoDB...");
        if (error) return res.send("MongoDB error");
        success(client.db(appId));
        next()
    })
};
