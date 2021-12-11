import Layout from '../Layout/Layout';
import { useState } from 'react';
import classes from './homepage.module.css';
import DisplayJokes from './DisplayJokes';


// This page will be the home page of each user
const homepage = (props) => {
    
    // Check the state of the picture
    let changePic = false;
    if(props.imgUrl=='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwRC1M5D_fQnawxdi4ZAMrsagPHltCktuJg&usqp=CAU') changePic = true;

    return (
    <>
        <Layout />
        <div className={classes.div1}>
            <div>
                <img src={props.imgUrl} alt='Profile picture' ></img>
                <h1> Good Morning {props.user}</h1>
            </div>
            <div>
                <i hidden={changePic}>You may change the profile picture by going to the profile settings, and choosing the change profile picture option</i>
            </div>
            <div>
                <DisplayJokes jokes={ props.jokes }/>
            </div>
        </div>
        
    </>
    );
}

export default homepage;
