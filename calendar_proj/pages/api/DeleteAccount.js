import { MongoClient,  ObjectId } from "mongodb";
import clients from "../../components/MongoDb/Connection";

const DeleteAccount = async (req, res) => {
    // get the username from the body of the requst
    const user = JSON.parse(req.body);

    // Connect to the database and the collections
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection('users');
    const eventCollection = db.collection('Event');

    //delete all the events
    const userAccount = await userCollection.findOne({"username": user})
 
    const userEvents = userAccount.Events;
    for(let i = 0; i < userEvents.length; i++)
    {
        await eventCollection.deleteOne({"_id": ObjectId(userEvents[i].toString())});
    }

    //delete user from friendlists
    const users = await userCollection.find().toArray();
    for(let i = 0; i < users.length; i++)
    {
        // Delete from friends
        if(users[i].Friends.includes(user))
        {
            await userCollection.findOneAndUpdate({"username":users[i].username},{$pull:{"Friends": user}})
        }
        // Delete from requested Frieds
        if(users[i].RequstFriends.includes(user))
        {
            await userCollection.findOneAndUpdate({"username":users[i].username},{$pull:{"RequestFriends": user}})
        }
    }

    // delete the user
    await userCollection.findOneAndDelete({"username": user});

    res.json({message: "user Deleted"});
    client.close();


}

export default DeleteAccount;
