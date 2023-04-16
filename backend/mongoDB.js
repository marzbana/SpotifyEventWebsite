const {MongoClient} = require('mongodb'); //Database

async function main() {
    //Connection URL info
    const uri = 'mongodb+srv://Jkwan:21323002448232@cluster0.dqni373.mongodb.net/test';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      await listDatabases(client);
      console.log(await UserExists(client, 01));
      console.log("Passed");
      await databaseInsertion(client, "middleName", "Arek", 01);
      console.log("Second Pass");
      console.log(await databaseQuery(client, "middleName", 1));
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


  async function databaseInsertion(client, field, value, userID) {
    console.log("Insertion of a field and value into a Database")
    field = field;
    value = value;
    userID = userID;
    await client.db("Users").collection("Users").updateOne( {_id: userID},
      {
        $set: {[field]: value}
      });
  }

  async function databaseQuery(client, field, userID) {
    console.log("Query for data")
    field = field;
    userID = userID;

    // val = await client.db("Users").collection("Users").find({_id: userID}, {[field] : 1})
    try {
      const result = await client.db("Users").collection("Users").findOne({_id: userID});
      return result.field;
    } catch (err) {
      throw err;
    }
  }

  async function UserExists(client, userID) {
    console.log('Checking if this User Exists')
    count =  await client.db("Users").collection("Users").find( {_id: userID} ).count()
    return count
  }


// state, access token, refresh token, userID, likedArtists
// String, String, String, String, String[]