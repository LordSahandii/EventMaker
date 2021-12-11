import { useState } from "react";
import classes from "./options.module.css";


const Friends = ({username, currentUser}) => {
    // The text should change when the user clicks on the button
    const [text, settext] = useState("Send Request")
    const [disable, setdisable] = useState(false)
    const jsonContent = JSON.stringify({
        username: username,
        currentUser: currentUser
    });

    //connect to the endpoint and change the text
    const sendRequest = () => {
        console.log(currentUser," wants to be friend with", username)
        const request = fetch('/api/SendFriendRequest', {
            method: "POST",
            body: jsonContent
        })
        settext("Request Sent");
        setdisable(true);
    }
    return (
        <div className={classes.Friends}>
            <span>{username}   </span>
            <button onClick={sendRequest} disabled={disable}>{text}</button>
        </div>
            
    )
}

export default Friends;
