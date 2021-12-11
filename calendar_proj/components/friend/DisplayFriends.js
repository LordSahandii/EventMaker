import { useState } from "react";
import { useRouter } from "next/router";
import ShowChat from "./ShowChat";
import classes from "./showChat.module.css"
import divClass from "./options.module.css"


const DisplayFriends = ({user}) => {
    let response;
    const router = useRouter()
    const user1 = router.query.homPage;

    //******************************************** */
    //  This part is to show the chat div
    //******************************************** */
    const [chatActive, setchatActive] = useState(true)
    const [history, sethistory] = useState([])

    const startChat = async () => {
        await retrieve();
        chatActive ? setchatActive(false): setchatActive(true);
    }

    //********************************************** */
    // Retrieve the messages from the database
    //********************************************** */

    const retrieve = async () => {
        if(chatActive)
        {
            const jsonContent = JSON.stringify({
                user1: user1,
                user2: user,
                type: "getMessages"
            });
            while (true) 
            {
                await fetch('/api/messages', {
                    method: "POST",
                    body: jsonContent
                }).then(req => req.json()).then(data => response = data);
                console.log(response.messages)
                if(response.messages == undefined) continue;         // we want to fetch again if the messages are being opened for the first time
                sethistory(response.messages.reverse());
                for(let i = 0; i < history.length; i++)
                {
                    history[i] = JSON.parse(history[i])
                }
                break;
            }
        }
    }


    //********************************************* */
    // This part is for the text message
    //********************************************* */
    const [text, settext] = useState('')

    const SendMessage = async () => {
        const jsonContent = JSON.stringify({
            user1: user1,
            user2: user,
            type: "sendMessages",
            message: text
        });

        await fetch('/api/messages', {
            method: "POST",
            body: jsonContent
        });
        settext("");
        setchatActive(true);
    }
    return (
        <div className={divClass.DisplayFriends}>
            <div>
                <p>
                    {user}   
                    <button onClick={startChat}>Chat</button>
                </p>
            </div>
            <div hidden={chatActive}>
                <input type='text' placeholder="Send a message" value={text} onChange={(e) => settext(e.target.value)} />
                <input type='button' value='Send' onClick={SendMessage} />
                <div className={classes.chatDiv}>
                    {(history.map((stringChat)=>JSON.parse(stringChat)).map((chat) => 
                        <ShowChat 
                        key={Math.random()}
                        CurrentUser={user1}
                        sentBy={chat.sentBy}
                        textMessage={chat.message}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DisplayFriends
