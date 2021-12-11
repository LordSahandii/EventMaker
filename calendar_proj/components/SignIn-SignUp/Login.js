import { useState } from "react";
import optionClass from './options.module.css';
import Header from "../IndexPage/Header";

const Login = ({handler}) => {
    const [userName, setuserName] = useState('');
    const [Password, setPassword] = useState('');
    
    const clickHandler = () => {
        handler(userName, Password); 
    }
    return (
        <div className={optionClass.divMother}>
            <Header />
            <div className={optionClass.div}>
                <h1>Sign In</h1> 
                <form>
                    <label>UserName</label><br />
                    <input type="text" placeholder="Enter your username" value={userName} onChange={(e) => setuserName(e.target.value)} /><br />
                    <label>Password</label><br />
                    <input type="password" placeholder="Enter your Password" value={Password} onChange={(e) => setPassword(e.target.value)} /><br />
                    <input type="button" value="Sign In" onClick={clickHandler} /> 
                </form>
            </div>
        </div>
        
    )
}

export default Login
