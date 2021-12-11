import ViewAllEvents from "../../../components/Events/ViewAllEvents";
import clients from "../../../components/MongoDb/Connection";
import { MongoClient } from "mongodb";
import Head from "next/head";

// This function will display all the events that are currently in the database
const View_Events = ({ events }) => {
    
    return (
    <>
        <Head>
            <title>View Events</title>
        </Head>
        <ViewAllEvents eventData={events}/>
    </>);
}


export async function getServerSideProps() {
     //connect to the database and add the information of the database
     const client = await MongoClient.connect(clients);
     const db = client.db();
 
     // Connect to the collections
     const eventCollection = db.collection("Event");
     const events = await  eventCollection.find({}).sort({Date : 1}).toArray()
     client.close()
     return {
         props: {
             events: JSON.parse(JSON.stringify(events))
         },

     };
}
export default View_Events;

