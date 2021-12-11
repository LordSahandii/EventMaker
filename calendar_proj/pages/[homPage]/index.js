import { useRouter } from 'next/router';
import Homepage from '../../components/homePage/homepage';
import axios from 'axios';
import clients from '../../components/MongoDb/Connection';
import { MongoClient } from 'mongodb';
import User from '../../components/checkUser';
import Head from 'next/head';
import Error from '../../components/404Error';


// This page will be the home page for the user
function homePage(props) {

    
    console.log(props.weather);
    

    // Import routing
    const router = useRouter();
    const user = router.query.homPage;   //Get the username of the current user

    try
    {
        // ind get's the index of the user who is currently logged in
        const ind = props.users.map((user) => user.username).indexOf(user);
        User=user;              // Assign user the value of the current user
   
        // If the index is -1(not found) or the user is not logged and the ip doesn't match
        if (ind == -1 || !props.users[ind].logged && props.users[ind].IpAddress != props.IpAddress)
        {
            router.replace('/SignIn');                      // redirect to the sign in page
        }
        else if(props.users[ind].logged && props.users[ind].ipAddress == props.ipAddress)
        {
            let currentUser = props.users[ind].username;            // assign current user the username

            // Return the homepage
            return (
                <>
                    <Head>
                        <title>
                            {currentUser}
                        </title>
                    </Head>
                    <Homepage 
                        user={currentUser} 
                        imgUrl={props.users[ind].imgUrl} 
                        jokes = {props.jokes} 
                    />

                </>);
        } else {
            return <Error />;
        }
    
    // if any error occurs than return a page not found error
    }catch(error)
    {
        return (
        <>
            <Head>
                <title>Page not Found</title>
            </Head>
            <h1>404 Page Not found</h1>
        </>);
    }
}

export async function getServerSideProps() {
    // Get a joke from the api
    const getJoke = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit");

    //Get current ip Address
    let data_top = await axios.get('https://geolocation-db.com/json/')
    const ipAddress = data_top.data.IPv4;

    //get the weather
    let weather = await axios.get('https://api.weatherapi.com/v1/current.json?key=0ae323d3acf842819c2172622211311&q='+ipAddress+'&aqi=no')

    //Connect to the database
    const client = await MongoClient.connect(clients);
    const db = client.db();
    const userCollection = db.collection("users");
    const users = await userCollection.find().toArray();
    client.close();

    return {
        props: {
            users: users.map((user) => ({
                username: user.username,
                logged: user.logged,
                IpAddress: user.IpAddress,
                imgUrl: user.imgUrl
            })),
            IpAddress: ipAddress,
            weather: weather.data,
            jokes: getJoke.data
        }
    };
}

export default homePage;