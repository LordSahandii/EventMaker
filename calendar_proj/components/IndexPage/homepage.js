import Header from "./Header";
import classes from './Homepage.module.css';
import ShowDiv from "./ShowDiv";
import { useState } from "react";

// This is the homepage, it will give some info about the website
const Homepage = () => {
    // Make variables for the display of each page
    const [DisplayMakeEvents, setDisplayMakeEvents] = useState(true);
    const [DisplayViewEvents, setDisplayViewEvents] = useState(true)
    const [DisplayMakeFriends, setDisplayMakeFriends] = useState(true)
    const [DisplayTextFriends, setDisplayTextFriends] = useState(true)
    const [DisplayNews, setDisplayNews] = useState(false)
    const [DisplayButtons, setDisplayButtons] = useState(true)

    // Press the next button
    const GoForward = () => {
        if(!DisplayNews) setDisplayNews(true), setDisplayMakeEvents(false);
        else if(!DisplayTextFriends)setDisplayTextFriends(true), setDisplayNews(false);
        else if(!DisplayMakeFriends) setDisplayMakeFriends(true), setDisplayTextFriends(false);
        else if(!DisplayViewEvents) setDisplayViewEvents(true), setDisplayMakeFriends(false);
        else if(!DisplayMakeEvents) setDisplayMakeEvents(true), setDisplayViewEvents(false); 
    }

    // Press the previous button
    const GoBackwards = () => {
        if(!DisplayNews) setDisplayNews(true), setDisplayTextFriends(false);
        else if(!DisplayTextFriends)setDisplayTextFriends(true), setDisplayMakeFriends(false);
        else if(!DisplayMakeFriends) setDisplayMakeFriends(true), setDisplayViewEvents(false);
        else if(!DisplayViewEvents) setDisplayViewEvents(true), setDisplayMakeEvents(false);
        else if(!DisplayMakeEvents) setDisplayMakeEvents(true), setDisplayNews(false);
    }

    return (
        <div className={classes.divMother}>
            <Header />
            <div className={classes.div}>
                <h1>Event Calendar Application</h1> 
                <div className={classes.container} onMouseEnter={() => {setDisplayButtons(false)}} onMouseLeave={() => {setDisplayButtons(true)}}>
                    <button hidden={DisplayButtons} onClick={GoBackwards}><i className="bi bi-arrow-left-circle"></i></button>
                    <div hidden={DisplayMakeEvents}>
                        <ShowDiv
                            text='Make Events'
                            imgUrl="/MakeEvents.png" 
                            extraText="Invite people to join your events, the more the merrier"
                        />
                    </div>
                    <div hidden={DisplayViewEvents}>
                        <ShowDiv 
                            text='View Events'
                            imgUrl="/ViewEvents.png" 
                            extraText="Check on all the events that are being posted by other people"
                        />
                    </div>
                    <div hidden={DisplayMakeFriends}>
                        <ShowDiv 
                            text='Make Friends'
                            imgUrl="/MakeFriends.png"
                            extraText="Meet new people or invite your friends to this new application"
                        />
                    </div>
                    <div hidden={DisplayTextFriends}>
                        <ShowDiv 
                            text='Text your Friends'
                            imgUrl="/TextFriends.png" 
                            extraText="Chat with your friends so that you could make plans and message with others on the same platform"
                        />
                    </div>
                    <div hidden={DisplayNews}>
                        <ShowDiv 
                            text='Read Latest News'
                            imgUrl="/ReadNews.png"
                            extraText="Stay informed of what is happening around you with the news tab, Get the latest information or search for any news of your liking"
                        />
                    </div>
                    <button hidden={DisplayButtons} onClick={GoForward}><i className="bi bi-arrow-right-circle"></i></button>
                </div>
            </div>
        </div>
            
        
    )
}

export default Homepage;
