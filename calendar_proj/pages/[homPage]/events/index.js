import ShowOptions from "../../../components/Events/ShowOptions";
import User from '../../../components/checkUser';
import Error404 from '../../../components/404Error';
import Head from "next/head";

// this function will let you choose whether to add an event or view events
const Events = () => {

    // Check if the user is correctly logged in
    if(User=='')
        return<Error404 />
    
    return (
    <>
        <Head>
            <title>Events</title>
        </Head>
        <ShowOptions />
    </>);
}

export default Events;
