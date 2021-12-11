import clients from '../../components/MongoDb/Connection';
import { MongoClient } from 'mongodb';

async function addToDatabase(req, res) {

    const eventData = req.body;
    //connect to the database and add the information of the database
    const client = await MongoClient.connect(clients);
    const db = client.db();

    // Connect to the collections
    const eventCollection = db.collection("Event");
    const userCollection = db.collection("users");

    //insert the event to the event data
    const result = await eventCollection.insertOne(JSON.parse(eventData));
    // get the id of the event and add it to the user database.
    const find = await eventCollection.findOne(JSON.parse(eventData));
    
    let username = find.Username;
    //const user = await userCollection.findOne({"username" : username});
    const find3 = await userCollection.findOneAndUpdate({"username" :username}, {$push: {"Events" : find._id}});

    // if the result was a success than send this data
    res.status(201).json({message: "Event inserted"});
    client.close();

}

export default addToDatabase;