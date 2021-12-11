import NewsPage from "../../../components/News/NewsPage";
import User from "../../../components/checkUser";
import Error from "../../../components/404Error";
import Head from "next/head";

// This page will display the news
const index = ({newsArticles}) => {
    // Check if the user is logged in correctly
    if (User == '')
        return <Error />;

    return (
    <>
        <Head>
            <title>News</title>
        </Head>
        <NewsPage newsArticles={newsArticles}/>
    </>);
}

export async function getServerSideProps() {
    // Connect to the news api
    const request = await fetch("https://newsapi.org/v2/everything?q=weather&sortBy=publishedAt&apiKey=aabd3b8062f24a48b367aaae8b7f44ff");
    // Get the data of the news
    const data = await request.json();
    return{
        props: {
            newsArticles: data.articles
        }
    }
}
export default index;
