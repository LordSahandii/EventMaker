import { MongoClient } from "mongodb";
import clients from "../../components/MongoDb/Connection";

const ManageRequest = async (req,res) => {
    //Get all the values from the request
    const request = JSON.parse(req.body);
    const username = request.username;
    const friend = request.friend;
    const action = request.action;
    
    // Connect to the DB and userCollection
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection("users");

    // Whether we accept or decline the request the frind must be removed from the users requestFriends array
    await userCollection.findOneAndUpdate({"username": username},{$pull:{"RequestFriends":friend}});
    if(action == "ADD"){
        const userinfo = await userCollection.findOne({"username": username});

        // Check if the friend already exists
        if (!userinfo.Friends.includes(friend))
        {
            // Add the friends to both the users arrays
            await userCollection.findOneAndUpdate({"username": username}, {$push:{"Friends": friend}});
            await userCollection.findOneAndUpdate({"username": friend},{$push:{"Friends": username}});
        }
    }

    //resopnse 
    res.status(201).json({message: "Job Done"});

}

export default ManageRequest;
