const { MongoClient } = require('mongodb');


const url = process.env.MONGODB_URI;
module.exports = MongoClient.connect(url, {
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => client.db());