import Weather from "../../../components/Weather/showWeather";
import User from '../../../components/checkUser';
import Error404 from '../../../components/404Error';
import Head from "next/head";

// This page will display the weather
const Ind = () => {
    // if the user is none than return an error
    // The user will become equal to '' if the user reloads the page
    if(User=='')
        return<Error404 />
    return (
    <>  
        <Head>
            <title>Weather</title>
        </Head>
        <Weather />
    </>);

}

export default Ind;
