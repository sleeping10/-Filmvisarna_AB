const betterSqlite3 = require('better-sqlite3');
const db = betterSqlite3('./database/filmvisarna');

//get the names of all tables and views in the db
let views = db.prepare(`
  select name
  from sqlite_schema
  where (type = 'view')
  `).all();

let tables = db.prepare(`
  select name
  from sqlite_schema
  where (type='table' and name like 'bookingHeader')
  or (type='table' and name like 'bookingLine')
  `).all();



module.exports = function api(app) {
  //add a special route that will list all views
  app.get('/api/views', (req, res) => {
    res.json(views);
  });
  app.get('/api/tables', (req, res) => {
    res.json(tables);
  });

  let together = views.concat(tables);

  for (let { name } of together) {
    app.get('/api/' + name, (req, res) => {
      let stmt = db.prepare(`
        SELECT * FROM ${name}
    `);
      let links = stmt.all();
      res.json(links);
    });
  }
}