const noteRoutes = require('./note_routes');
const data = require('./data');

module.exports = (app, db) => {
    noteRoutes(app, db);
    data(app, db);
};

