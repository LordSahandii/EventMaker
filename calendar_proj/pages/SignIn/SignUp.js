import { useRouter } from "next/router";
import Registration from "../../components/SignIn-SignUp/Registration";
import clients from "../../components/MongoDb/Connection";
import { MongoClient } from "mongodb";
import Head from "next/head";


// Main function
const SignUp = (props) => {
    // route for the application after the request has been sent
    const router = useRouter();

    // sends a post request to the endpoint api for this application
    // the file is inside the api folder
    // async to run it at the same time
    async function addUser(userInfo) {
        const ind = props.users.map((user) => user.username).indexOf(userInfo.username);
        if (ind == -1)
        {
            // use fetch to fetch the api to send the data
            const response = await fetch('/api/AddUser', {
                //the method is 'POST'
                method: 'POST',
                // The body needs to be JSON format
                body: JSON.stringify(userInfo),
                // Header is just for extra information
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // wait for the response of the api
            const data = await response.json();

            // change page
            router.push('/');
        }else
        {
            alert("The username is no longer available\nPlease insert another username")
        }
       
    };
    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            < Registration addUser={addUser} />
        </>);
    
};

export async function getServerSideProps() {

    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection("users");

    const users = await userCollection.find().toArray();
    client.close();

    return {
        props: {
            users: users.map((user) => ({
                username: user.username
            }))
        }
    };
}

export default SignUp;