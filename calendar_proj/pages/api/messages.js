import { MongoClient, ObjectId } from "mongodb";
import clients from "../../components/MongoDb/Connection";

const messages = async (req, res) => {
    //serach for the messages
    const request = JSON.parse(req.body);
    const user1 = request.user1;
    const user2 = request.user2;

    //connetct to the database
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const chatCollection = db.collection('Chat')


    //search for the right chat
    let chatId = -1;
    let resultId = -1;
    let result = await chatCollection.find().toArray();
    if(result.length>0)
    {
        for(let i = 0; i < result.length; i++)
        {
            if(result[i].Users.includes(user1) && result[i].Users.includes(user2)) 
            {
                chatId = result[i]._id.toString();
                resultId = i;
                break;
            }
        }
    }
        

    if(request.type=="getMessages")
    {
        // Create chat if it does not exist
        if(chatId==-1)
        {
            await chatCollection.insertOne({'Users': [user1, user2], "Messages" : []});
            res.json({message: 'new created'})
        }
        res.json({messages: result[resultId].Messages})
            
    }

    if(request.type=='sendMessages')
    {
        const jsonContent = JSON.stringify({
            sentBy: request.user1,
            message: request.message
        })
        await chatCollection.findOneAndUpdate({"_id": ObjectId(chatId)}, {$push:{"Messages": jsonContent}})
        res.json({message: "Message sent"});
    }
    
    
   
    client.close();
}

export default messages;
