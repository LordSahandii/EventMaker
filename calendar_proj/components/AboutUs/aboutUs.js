import classes from "./AboutUs.module.css";
import Header from "../IndexPage/Header";

// Display the information about the website
const AboutUs = () => {
    return (
        <div className={classes.AboutUs}>
            <Header /> 
            <div>
                <h3>Website built by:</h3>
                <ul>
                    <li>
                        <h5>Sahand Hajiseyedi </h5>
                    </li>
                    <li>
                        <h5>Sukhmandeep Singh</h5>
                    </li>
                    <li>
                        <h5>Kushal Sharma</h5>
                    </li>
                </ul>
                <h3>More info about the website</h3>
                <h5>This website was built using Next JS.</h5>
                <h5>The database used for the website is MongoDb</h5>
                <h5>The password encryptions type is MD5</h5>
                <h5>The website also uses 'axios' for some of the data fetching</h5>
                <h5>The icons are used from bootstrap-icons</h5>
                <h5>The APIs used are:</h5>
                <ul>
                    <li>
                        Weather: https://api.weatherapi.com/;
                    </li>
                    <li>
                        News: https://newsapi.org/;
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default AboutUs;
