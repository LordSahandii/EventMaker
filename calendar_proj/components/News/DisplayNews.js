import classes from "./DisplayNews.module.css";

// This function will display each news from the api
const DisplayNews = (props) => {
    // Get the first 10 digits from the date
    let date = props.publishedAt.slice(0,10)


    return (
        <div className={classes.newsContainer}>
            <a href={props.url} target="_blank" ><h2>{props.title}</h2></a>
            <div>
                <p>{props.description}</p>
                <img src={props.urlToImage} alt={props.title} />
            </div>
            <p>{date}</p>
        </div>
    )
}

export default DisplayNews;