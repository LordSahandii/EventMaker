import Layout from "../Layout/Layout";
import ViewSingleEvent from "./ViewSingleEvent";
import classes from './event.module.css';

const ViewAllEvents = ({eventData}) => {
    let count = 0;                      // To not create any error check if there is at least one event in the database
    eventData.map((event) => count++);
    return (
        <div className={classes.ViewAllEvents}>
            <Layout />
            {(count!=0) ? eventData.map((event)=> (
                <ViewSingleEvent 
                    key={event._id}
                    ImgURL={event.ImgURL}
                    Description={event.Description}
                    Date={event.Date}
                    Title={event.Title}
                />
            )) : <p>There are no events at the moment</p>}
        </div>
    )
}

export default ViewAllEvents
