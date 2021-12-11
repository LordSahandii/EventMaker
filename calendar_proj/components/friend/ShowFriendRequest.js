import { useRouter } from "next/router";

const ShowFriendRequest = ({name, username}) => {
    const router = useRouter();
    let action;

    // if the user decides to accept the request
    // change the value of action to "ADD";
    const sendAccept = () => {
        action = "ADD";
        sendRequest();
    }

    // if the user decides to decline the request
    const sendDecline = () => {
        action = "DECLINE";
        sendRequest();
    }

    // connect with the api and make the request
    // route to the same page to show the updates
    const sendRequest = () => {
        const jsonContent = JSON.stringify({
            username: username,
            friend: name,
            action: action
        });

        const request = fetch("/api/ManageRequest", {
            method: "POST",
            body: jsonContent
        });
        router.replace('/'+username+'/Friends')
    }
    return (
        <div>
            {name} 
            <button onClick={sendAccept}>Add</button>
            <button onClick={sendDecline}>Decline</button>
        </div>
    )
}

export default ShowFriendRequest;
