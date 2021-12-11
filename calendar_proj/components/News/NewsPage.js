import Layout from '../Layout/Layout';
import DisplayNews from './DisplayNews';
import { useState } from 'react';
import classes from './DisplayNews.module.css';

const newsPage = ({newsArticles}) => {
    const [SearchNews, setSearchNews] = useState('');           // For the search option
    const [newsArticle, setnewsArticle] = useState(newsArticles);       //The articles that should be displayed

    // Search handler
    const GoSearch = async () => {
        let response = '';
        // if there is no search don't send the request
        if(SearchNews != '')
        {

            // Make the request to the ap
            await fetch('/api/getNews' ,{
                method: "GET",
                params: SearchNews
            }).then(req => req.json()).then(data => response = data.newsArticles.articles);
            // set the value of newsArticle to the response
            setnewsArticle(response);
        }
        setSearchNews('')
    }

    return (
        <div className={classes.motherDiv}>
            <Layout />
            <div className={classes.childDiv}>
                <input type='text' value={SearchNews} onChange={(e) => setSearchNews(e.target.value)} />
                <input type='button' onClick={GoSearch} value="Search News" />
            </div>
            {newsArticle.map((news) => (
                <DisplayNews 
                description={news.description}
                publishedAt={news.publishedAt}
                title={news.title}
                url={news.url}
                urlToImage={news.urlToImage} 
                key={news.url}/>
            ))}
        </div>
    )
}

export default newsPage;
