import classes from "./event.module.css"

// Display each event
const ViewSingleEvent = ({ImgURL, Title, Description, Date}) => {
    return (
        <div className={classes.motherDiv}>
            <h2>{Title}</h2>
            <span>{Description}</span>
            <img src={ImgURL} alt={Title} ></img>
            <p>{Date}</p>
        </div>
    )
}

export default ViewSingleEvent
