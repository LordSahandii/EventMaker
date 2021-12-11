import classes from "./Homepage.module.css";

const ShowDiv = ({text, imgUrl, extraText}) => {
    return (
        <div className={classes.ShowDiv}>
            <h3>{text}</h3>
            <div>
                <span>{extraText}</span>
                <img src={imgUrl} alt={text} />
            </div>
        </div>
    );
}

export default ShowDiv
