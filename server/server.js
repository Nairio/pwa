const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const mongodb = require("./mongodb");
const router = require("./routes");
const app = express().use(bodyParser.urlencoded({extended: true}));
app.listen(config.port);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    //res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    //res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    //res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

mongodb(app, db => router(app, db));