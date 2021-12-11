import axios from 'axios';
import clients from '../../components/MongoDb/Connection';
import { MongoClient } from 'mongodb';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


async function sendData(req, res) {
	//Get the ip Address of the user
	const data_top = await axios.get('https://geolocation-db.com/json/')
    const ipAddress = data_top.data.IPv4;

	// Connect to the database
	const client = await MongoClient.connect(clients);
	const db = client.db();
	const userCollection = db.collection("users");

	// this is run from the index
	if (req.method === "POST")
	{
		let userName = req.body;
		
		await userCollection.updateOne(
			{username : userName},
			{$set: {"logged" : true, "IpAddress" : ipAddress}},
			);

		res.status(201).json({message: "Logged Changed"});
	}

	client.close();	
}

// export the above function
export default sendData;
