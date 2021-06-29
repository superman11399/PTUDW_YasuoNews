const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'qlbh',
    port: 3306
  },
  pool: {
    min: 0,
    max: 50
  }
});

module.exports = knex;


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://yasuo_news_app:IOk7oc6lAsAIUuFP@cluster0.v8zx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
