import { MongoClient } from "mongodb";
import clients from "../../components/MongoDb/Connection";

const ChangeProfilePic = async (req, res) => {
    // get all the values from the requst
    const request = JSON.parse(req.body);
    const user = request.user;
    const imgUrl = request.imgUrl

    //connect to the database and userCollection
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection('users');

    // Change the image url
    await userCollection.findOneAndUpdate({"username": user},{$set:{"imgUrl": imgUrl}})
   
    // send a response
    res.status(201).json({message: "Profile Pic Changed"})
    client.close();
}

export default ChangeProfilePic;
