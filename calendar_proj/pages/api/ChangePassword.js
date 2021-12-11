import { MongoClient } from "mongodb";
import clients from "../../components/MongoDb/Connection";

const ChangePassword = async (req, res) => {
    //get all the values from the requst
    const request = JSON.parse(req.body);
    const user = request.user;
    const password = request.password;

    //Connect to the databse and go to the collection
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection('users');

    //update the password;
    await userCollection.findOneAndUpdate({"username": user},{$set:{"password": password}});

    //response
    res.status(201).json({message:"Password Updated"});
}

export default ChangePassword;
