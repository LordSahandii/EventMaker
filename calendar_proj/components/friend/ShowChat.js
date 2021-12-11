import classes from "./showChat.module.css"

const ShowChat = ({sentBy, textMessage, CurrentUser}) => {
    // Show the chat of each one
    if(sentBy == CurrentUser)
    {
        return (
            <div className={classes.hello}>
                <p className={classes.friend}>{textMessage}</p>
            </div>
        )
    }
    return (
        <div className={classes.hello}>
            <p className={classes.CurrentUser}>{textMessage}</p>
        </div>
    )}

export default ShowChat
