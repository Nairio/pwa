module.exports = (app, client) => {
    require('./getAll')(app, client);
    require('./change')(app, client);
    require('./delete')(app, client);
    require('./add')(app, client);
    require('./generator')(app, client);
    require('./auth')(app, client);
};