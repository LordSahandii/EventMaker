import { useRouter } from "next/router";
import { useState } from "react";
import optionClass from '../SignIn-SignUp/options.module.css';
import Layout from "../Layout/Layout";

const AddEvent = ({addToDatabase}) => {
    let check = true;       // used to verify if the form is complete
    const router = useRouter();
    const username = router.query.homPage;
    const [ImgURL, setImgURL] = useState("");               // Url of the image
    const [Title, setTitle] = useState("");                 // Title of the event
    const [Date, setDate] = useState("");                   // Date of the event
    const [Description, setDescription] = useState("");     // Description of the event

    if (Title != "" && Date != "" && Description != "") check= false;   // if the fiels are empty set check  to false

    // Submit the form
    function formSubmitted () {
        //If the image is not inserted, a default one will be used
        let eventData = "";
        if (ImgURL === "")          //this if there is no image specified
        {
            eventData = {
                ImgURL: "https://media.istockphoto.com/photos/chalkboard-and-colored-balloons-on-a-wooden-background-picture-id1263908025?b=1&k=20&m=1263908025&s=170667a&w=0&h=DDeDvtWSu99Z5yKrbx0X3M26uHGP1SCBV_-zXKS-FSQ=",
                Title: Title,
                Date: Date,
                Description: Description,
                Username: username
            };   
        }
        else{
            eventData = {
                ImgURL: ImgURL,
                Title: Title,
                Date: Date,
                Description: Description,
                Username: username
            }
        }

        // Call the function to add the object to the database
        addToDatabase(eventData)
    }
   
    return (
        <div className={optionClass.divMother}>
            <Layout />
            <div className={optionClass.div}>
                <h1>Add Event</h1> 
                <form>
                    <label>Image </label>
                    <input type="text" placeholder="Insert the url of a picture" value={ImgURL} onChange={(e) => setImgURL(e.target.value)} /><br />
                    <label>Title </label>
                    <input type="text" placeholder="Insert the title" value={ Title } onChange={(e) => setTitle(e.target.value)} /><br />
                    <label>Date </label>
                    <input type="date" value={ Date } onChange={(e) => setDate(e.target.value)} /><br />
                    <label>Description </label>
                    <input type="text" placeholder="Enter A brief Description" value={Description} onChange={(e) => setDescription(e.target.value)}/><br />
                    <input type="button" onClick={ formSubmitted } disabled={check} value="Add" />
                </form>
            </div>
        </div>
    );
}

export default AddEvent;
