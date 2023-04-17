const {MongoClient} = require('mongodb'); //Database
//mongoDB_API is a string that contains the uri in an .env file
const {mongoDB_API} = require('./config.js');
class MongoDB {
  constructor() {
    this.client = new MongoClient(mongoDB_API);
  }
async  main() {
    //Connection URL info
    const uri = mongoDB_API;
    console.log(mongoDB_API);
    try {
      await client.connect();
      await listDatabases(client);
      console.log(await UserExists(client, 01));
      console.log("Passed");
      await databaseInsertion(client, "middleName", "Arek", 1);
      console.log("Second Pass");
      console.log(await databaseQuery(client, "middleName", 1));
    } catch (e) {
        console.error(e);
    } finally {
      await client.close();
    }
  }


//Sample function to list the databases in the DB cluster
async  listDatabases(){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  
    
 


  async databaseInsertion(field, value, userID) {
    console.log("Insertion of a field and value into a Database")
    field = field;
    value = value;
    userID = userID;
    await client.db("Users").collection("Users").updateOne( {_id: userID},
      {
        $set: {[field]: value}
      });
  }

  async databaseQuery(field, userID) {
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

  async userExists(userID) {
    console.log('Checking if this User Exists')
    count =  await client.db("Users").collection("Users").find( {_id: userID} ).count()
    return count
  }



// state, access token, refresh token, userID, likedArtists
// String, String, String, String, String[]
}
module.exports = MongoDB;