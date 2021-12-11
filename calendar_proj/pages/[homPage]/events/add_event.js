import AddEvent from "../../../components/Events/AddEvent";
import { useRouter } from "next/router";
import User from '../../../components/checkUser';
import Error404 from '../../../components/404Error';
import Head from "next/head";


const add_event = () => {
    // Check if the user is correctly logged in
    if (User=='')
        return <Error404 />


    const router = useRouter();                         // implement routing

    // add the even in the database
    async function addToDatabase(eventData) {
        const username = router.query.homPage;          // get the current user
        const response = await fetch('/api/AddEvent', {
            method: 'POST',
            body: JSON.stringify(eventData),
        });                                             // Send the request to the backend

        router.replace("/"+username);                   // Redirect the page to the home page
    }
    return (
    <>
        <Head>
            <title>Add Event</title>
        </Head>
        <AddEvent addToDatabase={addToDatabase} />
    </>);
}

export default add_event;
