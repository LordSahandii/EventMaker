import Layout from "../Layout/Layout";
import { useState } from "react";
import  MD5  from '../encryption/md5Encr';
import { useRouter } from "next/router";
import classes from './profile.module.css';

const Profile = () => {
    // get the current user
    const router = useRouter();
    const username = router.query.homPage;
    //******************************************************************** */
    // This part is to display the different parts of the page
    //******************************************************************** */
    const [passwordChangeDiv, setpasswordChangeDiv] = useState(true);
    const [pictureChangeDiv, setpictureChangediv] = useState(true);
    const [deleteAccountDiv, setdeleteAccountDiv] = useState(true);

    const pictureChange = () => {
        setpasswordChangeDiv(true);
        setpictureChangediv(false);
        setdeleteAccountDiv(true);
    }

    const passwordChange = () => {
        setpasswordChangeDiv(false);
        setpictureChangediv(true);
        setdeleteAccountDiv(true);
    }

    const deleteAccount = () =>  {
        setpasswordChangeDiv(true);
        setpictureChangediv(true);
        setdeleteAccountDiv(false);
    }


    //***************************************************** */
    //  This part is for the change password
    //***************************************************** */
    let passwordButton = true;
    let message = ''
    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState(""); 

    // check the password
    if (NewPassword.length >= 8){
        NewPassword===ConfirmPassword ? passwordButton = false : message="Password doesn't Match";
    }else{
        message="Password is too short";
    }

    // Change the value if the field is empty
    NewPassword=="" || ConfirmPassword=="" ? message='' : message=message;

    // Connect to the api and change the password
    const resetPassword = () => {
        const jsonContent = JSON.stringify({
            user: username,
            password: MD5(NewPassword)
        });
        const request = fetch('/api/ChangePassword',{
            method: "POST",
            body: jsonContent
        });

        router.replace('/'+username);
    }

    //********************************************** */
    // This part is for Adding a profile picture
    //********************************************** */
    const [picUrl, setpicUrl] = useState("");

    const ChangePic = () => {
        const jsonContent = JSON.stringify({
            user: username,
            imgUrl: picUrl
        });
        //connnect to endpoint to change pic
        console.log("change pic");
        const request = fetch('/api/ChangeProfilePic', {
            method: "POST",
            body: jsonContent
        });
        setpicUrl('');
        router.replace('/'+username+'/Profile');
    }

    //*********************************************** */
    //  This part is for deleting an account
    //*********************************************** */

    const deleteAcc = () => {
        const deleteA = fetch("/api/DeleteAccount", {
            method: "POST",
            body: JSON.stringify(username)
        });

        router.replace('/');
    }

    const notDeleteAcc = () => {
        router.replace('/'+username+"/Profile");
    }





    return (   
        <div className={classes.profile}>
            <Layout />
            {/* use flex for this part */}
            <div>
                <div>
                    <button onClick={pictureChange}>Change Profile Pic</button><br />
                    <button onClick={passwordChange}>Change Password</button><br />
                    <button onClick={deleteAccount}>Delete Account</button>
                </div>

                <div hidden={passwordChangeDiv}>
                    <h2>Change Password</h2>
                    <input type="password" placeholder="New Password" value={NewPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
                    <input type="password" placeholder="Confirm Password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br />
                    <input type="button" onClick={resetPassword} disabled={passwordButton} value="Change Password" />
                    <p>{message}</p>
                </div>

                <div hidden={pictureChangeDiv}>
                    <h2>Picture Change</h2>
                    <input type="text" placeholder="Enter picture URL" value={picUrl} onChange={(e) => setpicUrl(e.target.value)} /><br />
                    <input type="button" onClick={ChangePic} value="Add Profile Picture" />
                </div>

                <div hidden={deleteAccountDiv}>
                    <h2>Delete Account</h2>
                    <h5>Are you sure that you would like to delete your account?</h5>
                    <button onClick={deleteAcc}>Yes</button>
                </div>

            </div>
           
            
        </div>
    )
}

export default Profile;
