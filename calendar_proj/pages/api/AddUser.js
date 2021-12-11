import clients from "../../components/MongoDb/Connection";
import { MongoClient } from 'mongodb';

async function sendData(req, res) {
  // check if the method of the request is 'post'
  if (req.method === 'POST')
  {
    // save the body of the request(userInfo) inside a variable
    const data = req.body;  
    // Connect to the database
    const client = await MongoClient.connect(clients);
    const db = client.db();
    // connect ot the cluster's collection
    const userCollection = db.collection("users");
    // insert the data required
    const result = await userCollection.insertOne(data);
    // if the result was a success than send this data
    res.status(201).json({message: "User inserted"});

    // close the client database
    client.close();
  }
  
}

// export the above function
export default sendData;


