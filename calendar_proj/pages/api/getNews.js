// this is the endpoint for the news
const getNews = async (req, res) => {

    // find what we need to search
    const search = req.params;

    // make the request to the endpoint
    const request = await fetch("https://newsapi.org/v2/everything?q="+search+"&sortBy=publishedAt&apiKey=aabd3b8062f24a48b367aaae8b7f44ff");

    // get the json for the request
    const data = await request.json();
    
    // Send back a response
    res.status(200).json({newsArticles: data})
}

export default getNews
