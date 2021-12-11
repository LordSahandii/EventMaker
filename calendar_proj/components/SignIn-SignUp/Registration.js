import { useState } from "react";
import optionClass from './options.module.css';
import  MD5  from '../encryption/md5Encr';
import Header from "../IndexPage/Header";

// registration will ask the user to sign in
// addUser function is sent as a prop
const Registration = ({addUser}) => {
    // message is displayed for some basic error-checking
    let message;
    // "check" will check if everything is fine and will set the sign up button as clear
    let check;
    // use state for all the variables
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordConfirmation, setPasswordConfirmation] = useState("");
    // set message to nothin
    message = "";
    // set check to true
    check = true;

    // checks if the fields are empty
    if (Email != "" && UserName != "" && Password != "")
    {   
        // checks if the password is at least 8 characters
        if (Password.length > 7)
        {
            // check if the password equals to the password confirmation
            if (PasswordConfirmation === Password)
            {
                // changes the value of "check" to false
                check = false;
            }else{
                // output if the password doesn't match
                message="The Password doesn't match";
            }
        }else{
            // Output if the password is too short
            message="The Password is too short, Please make sure it's at least 8 characters!!";
        }
    }

    // this part should check if the email has a correct format
    // it uses regex expression
    // use this alongside onblur, but not working as expected

    const verifyMail = () => 
    {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(re.test({Email}.Email))&&Email!='')
            {
                check = true;
                message="Check your Email";
            }
    }
    

    
    // this function will excecute once the person clicks the submit button
    const clickHandler = () => {
        // put all the data inside one object
        const userData = {
            email: Email,
            username: UserName,
            password: MD5(Password),
            logged: false,
            IpAddress: '',
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYZ9_mFESYzHy-IsqwadJj9VbRPhC-0hyqg&usqp=CAU",
            Events: [],
            Friends: [], 
            RequestFriends: []
        };
        // call the function that was sent as a prop with the data retrieved from the page
        addUser(userData);
    }
    
    return (
        <div className={optionClass.divMother}>
            <Header />
            <div className={optionClass.div}>
                <h1>Sign Up</h1> 
                <form>
                    <label>Email</label><br />
                    <input type="text" required placeholder="Enter your Email" value={Email} onKeyDown={verifyMail()} onChange={(e) => setEmail(e.target.value)}  /><br />
                    <label>Username</label><br />
                    <input type="text" required placeholder="Enter a Username" value={UserName} onChange={(e) => setUserName(e.target.value)} /><br />
                    <label>Password</label><br />
                    <input type="password" required placeholder="Enter your Password" value={Password} onChange={(e) => setPassword(e.target.value)} /><br />
                    <label>Confirm Password</label><br />
                    <input type="password" required placeholder="Confirm your Password" value={PasswordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} /><br />
                    <p>{message}</p>
                    <input type="button" value="Sign Up" disabled={check} onClick={clickHandler} />
                </form>
            </div>
        </div>
        
    )
}

// export the above function
export default Registration;
