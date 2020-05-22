const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const mongodb = require("./mongodb");
const router = require("./routes");
const app = express();

app.use(bodyParser.text()).use((req, res, next) => {
    req.body = JSON.parse(req.body);

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.listen(config.port);

mongodb(app, client => router(app, client));