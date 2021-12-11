import clients from '../../components/MongoDb/Connection';
import { MongoClient } from 'mongodb';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


async function LogOut(req, res) {
	const client = await MongoClient.connect(clients);
	const db = client.db();
	const userCollection = db.collection("users");

	// this is run from the index
	if (req.method === "POST")
	{
		let userName = req.body;
		
		await userCollection.updateOne(
			{username : userName},
			{$set: {"logged" : false}},{$set:{'IpAddress':''}}
			// {upsert : true}
			);

		res.status(201).json({message: "Logged Changed"});

		client.close()
	}
}

// export the above function
export default LogOut;
