import { useRouter } from 'next/router';
import Layout from '../Layout/Layout';
import classes from "./event.module.css";

const ShowOptions = () => {
    const router = useRouter();
    //get the username of the user
    const username = router.query.homPage;


    const addEvent = () => {
        //first we connect to the database to get add the event from the user
        router.push("/" + username + "/events/add_event");
    }
    function viewEvent() {
        // redirect to the view events page
        router.push("/" + username + "/events/view_Events");
        console.log("View Event");
    }
    return (
        <div className={classes.divMother}>
            <Layout />
            <div>
                <button onClick={addEvent}>Add an Event</button>
                <button onClick={viewEvent}>View Events</button>
            </div>
        </div>
    );
}

export default ShowOptions;
