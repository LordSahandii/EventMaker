//import all the files needed
import Login from "../../components/SignIn-SignUp/Login";
import { useRouter } from "next/router";
import MD5 from "../../components/encryption/md5Encr";
import clients from '../../components/MongoDb/Connection';
import { MongoClient } from "mongodb";
import Head from "next/head";


// main function
const SignIn = (props) => {
    // route for changing the page
    const router = useRouter();

    async function checkUser(username, password) {

        // Get the index of the user who logs in
        const ind = props.users.map((user) => user.username).indexOf(username);
        
        // if there is no user in the database -1 will result
        if (ind == -1)
        {
            // Redirect to the user not found page
            router.replace('/SignIn/UserNotFound');
        }
        // If the user and password match, Authenticate the user
        else if (props.users[ind].password == MD5(password))
        {
            const response = await fetch('/api/Authenticate', {
                //the method is 'POST'
                method: 'POST',
                body: username
                // Header is just for extra information
            });
            // Redirect to the user home page
            router.replace('/' + username);
        }
        // If the user is there, and the password doesn't match
        else
        {
            alert("Wrong Password");
        }
    }
    return (
        <>
        <Head>
            <title>Sign in</title>
        </Head>
            <Login handler={checkUser}/>
        </>);
}

export async function getServerSideProps() {
    
    //This is the database
    const client = await MongoClient.connect(clients);
    // await client;
    const db = client.db();
    const userCollection = db.collection("users");

    const users = await userCollection.find().toArray();
    // console.log(users)
    client.close();

    // Return the props
    return {
        props: {
            users: users.map((user) => ({
                username: user.username,
                password: user.password,
            }))
        }
    };
}

export default SignIn;

