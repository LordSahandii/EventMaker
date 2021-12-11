import Calendar from "../../../components/Calendar/Calendar";
import User from '../../../components/checkUser';
import Error404 from '../../../components/404Error';
import clients from "../../../components/MongoDb/Connection";
import { MongoClient } from "mongodb";
import Head from "next/head";

// This page will display a calendar and let you see the events on each day
const index = (props) => {
    // Check if the user is correctly logged in
    if(User=='')
        return <Error404 />;

    return(
    <>
        <Head>
            <title>Calendar</title>
        </Head>
        <Calendar EventsList={props.events}/>
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

export default index;
