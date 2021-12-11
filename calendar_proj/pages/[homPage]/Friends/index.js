import Options from "../../../components/friend/Options";
import clients from "../../../components/MongoDb/Connection";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import User from '../../../components/checkUser';
import Error404 from '../../../components/404Error';
import Head from "next/head";


const Friend= ({users}) => {
    // Check if the user is correctly logged in
    if(User=='')
        return <Error404 />

    // get the user who is currently logged in
    const router = useRouter();         // implement routing
    const currentUser = router.query.homPage;
    
    //make a search list for the users
    let allUsers = JSON.parse(users).map((user) => user.username!=currentUser ? user.username : '' ); 

    // find all the info of the current user from the list(props)
    const username = JSON.parse(users).filter((user) => user.username==currentUser)[0];

    return (
    <>
        <Head>
            <title>Friends</title>
        </Head>
        <Options allUsers={allUsers} username={username} />
    </>);
}

export async function getServerSideProps() {
    // connect to the database
     const client = await MongoClient.connect(clients);
    const db = client.db();
    
    // get the user collection
    const userCollection = db.collection("users");

    const users = JSON.stringify( await userCollection.find().toArray());

    return {
        props: {
            users: users
        },
    }

}


export default Friend;
