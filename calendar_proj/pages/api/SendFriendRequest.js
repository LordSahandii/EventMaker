import { MongoClient } from "mongodb";
import clients from "../../components/MongoDb/Connection";


const SendFriendRequest = async (req, res) => {

    //get all the values from the request
    const content = JSON.parse(req.body);
    const user = content.username;
    const currentUser = content.currentUser;

    //connect to the database and the right collection
    const client = await MongoClient.connect(clients);
	const db = client.db();
	const userCollection = db.collection("users");

    //we will not send the request if the requst has already been sent.
    const username = await userCollection.findOne({"username": user});
    if(username.RequestFriends.includes(currentUser))
    {
        // console.log("Requst already sent");
    }
    else{
        //Add the friend to the friend requst list.
        await userCollection.findOneAndUpdate({"username": user}, {$push: {"RequestFriends": currentUser}});
    }

    //send a response back 
    res.status(201).json({message: "Friend request sent"});
    
    //close the client
    client.close();
}

export default SendFriendRequest;
