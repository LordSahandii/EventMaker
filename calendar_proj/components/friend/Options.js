import Layout from "../Layout/Layout";
import Friends from "./Friends";
import classes from "./options.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import ShowFriendRequest from "./ShowFriendRequest";
import DisplayFriends from "./DisplayFriends";


const Options = ({allUsers, username}) => {


    //************************************************* */
    //  THIS PART IS FOR SHOWING THE CURRENT FRIENDS AND 
    //  FOR SENDING REQUEST TO A USER
    //************************************************* */

    
    // get the username of the current user
    const router = useRouter();
    const currentUser = router.query.homPage;

    //Declare the state varaibles
    const [showAllUsers, setshowAllUsers] = useState(true);
    const [SearchFriend, setSearchFriend] = useState("");
    // const [emptyList, setemptyList] = useState(false);
    let emptyList = false;

    //these functions will change the value of hidden for the search freinds div
    const addFriend = () => {
        setshowAllUsers(false)
    }
    const noAddFriend = () => {
        if(!showAllUsers) setshowAllUsers(true);
    }

    //check the users to find only the one that match with the search
    allUsers  = allUsers.map((user) => {
        if (user.toLowerCase().includes(SearchFriend) && !username.Friends.includes(user))
            return user
        return '';
    });

    

    //remove all the '' from allUsers
    allUsers = allUsers.filter((user) => user!='');

    
    if (allUsers==0)
        emptyList = true;

    //******************************************************** */
    //  THIS PART IS FOR ACCEPTING THE REUQESTS YOU RECEIVE
    //******************************************************** */

    // Declare variables to use
    let showRequest = username.RequestFriends[0]==undefined;
    const [check, setcheck] = useState(true)
    const showFriendRequst = () => {
        setcheck(false)
    }

    return (
        <div className={classes.Options}>
        <Layout />
        <div className={classes.motherDiv} >
            <h1>Friends</h1>
            <div hidden={showRequest}>
                <p>You have some request friend Requests.</p>
                <button onClick={showFriendRequst}>Check</button>
                <div hidden={check}>
                    {username.RequestFriends.map((user) =>
                        <ShowFriendRequest
                            key={user}
                            name={user}
                            username={currentUser}
                        />
                    )}
                </div>
            </div>
            <input type="text" value={SearchFriend} placeholder="Add a new Friend" onPointerUp={addFriend} onMouseOut={noAddFriend} onChange={(e) => setSearchFriend(e.target.value)} />
            <div hidden={showAllUsers} onMouseOver={addFriend} onMouseOut={noAddFriend}>
                {allUsers.map((user) => (
                    <Friends
                        key={user} 
                        username={user} 
                        currentUser={currentUser}
                    />
                ))}
                <p hidden={!emptyList}>No user was found</p>
            </div>
            <div hidden={!showAllUsers}>

                    {username.Friends.map((user) => (
                        <DisplayFriends 
                            key={user}
                            user={user}
                        />
                    ))}
                    {username.Friends[0] == undefined ? <p>You currently have no Friends</p> : "" }
            </div>
            
        </div>
        </div>
    );
}

export default Options;
