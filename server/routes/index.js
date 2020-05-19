module.exports = (app, db) => {
    require('./getAll')(app, db);
    require('./change')(app, db);
    require('./delete')(app, db);
    require('./add')(app, db);
    require('./generator')(app, db);
};