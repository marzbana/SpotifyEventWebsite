const {MongoClient} = require('mongodb'); //Database

async function main() {
    //Connection URL info
    const uri = 'mongodb+srv://Jkwan:21323002448232@cluster0.dqni373.mongodb.net/test';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
      await client.close();
    }
  }


//Sample function to list the databases in the DB cluster
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  
    
  module.exports = {
    listDatabases,
    main
  };


