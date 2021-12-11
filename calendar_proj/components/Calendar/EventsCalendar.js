import ViewSingleEvent from "../Events/ViewSingleEvent";

const EventsCalendar = ({date, EventsList}) => {
    // Filter the events corresponding to the date
    let filterEvent = EventsList.filter((event) => event.Date == date);

    //get the lenght of the object that has been created
    let len = 0;
    filterEvent.map(() => len++)

    // if the date has not been defined return nothing
    if(date==undefined) return <></>;
    
    //if the list is empty say that there are no events for the corresponding day
    if(len==0)
    {
        return (
            <div>
                <p>
                    There are currently no events for this day
                </p>
            </div>
        )
    }
    if(len!=0)
    {
        return (
            <div>
                {filterEvent.map((event)=> (
                <ViewSingleEvent 
                    key={event._id}
                    ImgURL={event.ImgURL}
                    Description={event.Description}
                    Date={event.Date}
                    Title={event.Title}
                />))}
            </div>
        )
    }
 
}

export default EventsCalendar;
