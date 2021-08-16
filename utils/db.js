const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "us-cdbr-east-04.cleardb.com",
    user: "b2551bac081274",
    password: "cf227146",
    database: "heroku_7904d93bd08f46b",
    port: 3306,
  },
  pool: {
    min: 0,
    max: 50,
  },
});

module.exports = knex;
