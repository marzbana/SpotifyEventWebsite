const {MongoClient} = require('mongodb'); //Database
//mongoDB_API is a string that contains the uri in an .env file
const {mongoDB_API} = require('./config.js');
class MongoDB {
  //client global variable
  
  constructor() {
    const uri = mongoDB_API;
    const client = new MongoClient(uri);
    this.collection = null;
  
    // Connect to MongoDB and set this.collection
    client.connect().then(() => {
      this.collection = client.db("Spotify").collection("Users");
      console.log("Connected to MongoDB and set collection");
    }).catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
  }
  
async  main() {
    //Connection URL
    try {
      await this.client.connect();
      return await this.listDatabases();
    } catch (e) {
        return e;
    }
  }


//Sample function to list the databases in the DB cluster
async  listDatabases(){
    const client = this.collection;
    let databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  
    
 


  async databaseInsertion(field, value, userID) {
    const client = this.collection;
    field = field;
    value = value;
    userID = userID;
    await client.updateOne( 
      {_id: userID},
      {$set: {[field]: value}}, 
      {upsert: true}
      );
      console.log("Insertion of a field and value into a Database")
  }

  async databaseQuery(field, userID) {
    const client = this.collection;
    
    field = field;
    userID = userID;

    // val = await client.db("Users").collection("Users").find({_id: userID}, {[field] : 1})
    
      const result = await client.findOne({_id: userID});
      console.log(result[field]);
      //return result of the string vale of field
      return result[field];
  }

  async userExists(userID) {
    const client = this.collection;
    count =  await client.find( {_id: userID} ).count()
    console.log('Checking if this User Exists')
    return count
  }



// state, access token, refresh token, userID, likedArtists
// String, String, String, String, String[]
}
module.exports = MongoDB;