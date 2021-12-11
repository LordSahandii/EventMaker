
const DisplayJokes = ({ jokes }) => {
    let joke;                   // This variable will contain the joke

    // check if the joke is 'single' or 'twopart'
    if(jokes.type == "twopart")
    {
        joke = jokes.setup +"\n" + jokes.delivery;
    }else
    {
        joke = jokes.joke;
    }


    return (
        <div>
            <h1>Joke Time :) :)</h1>
            { joke }
        </div>
    )
}

export default DisplayJokes
