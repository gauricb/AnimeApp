import express from 'express';
import morgan from 'morgan'
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 4002;

app.use(morgan('dev'));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// get anime list from Jikan API
app.get('/animeList', async (req, res) => {
    const url = 'https://api.jikan.moe/v4/anime?start_date=1990-01-01&end_date=1999-12-31';
    //const url = 'https://api.jikan.moe/v4/top/anime'
    //const url = 'https://api.jikan.moe/v4/random/anime'
    try {
        // Sending a GET request to the specified URL using the fetch function
        const response = await fetch(url);

        // Parsing the response body as JSON
        const json = await response.json();

        // Calling getAnimeDetails function for each anime object in the fetched data
        const animeDetails = json.data.map(anime => getAnimeDetails(anime));

        // Sending the array of anime details as the JSON response
        res.json(animeDetails);
    } catch (error) {
        // Handling errors and sending an appropriate error response
        console.error('Error fetching anime list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/anime/:id', async (req, res) => {
    const id = req.params.id;
    const url = `https://api.jikan.moe/v4/anime/${id}`;
    try {
        const response = await fetch(url);
        const json = await response.json();

        // call getAnimeDetails for each anime object
        const animeDetails = getAnimeDetails(json.data);

        // Send the array of anime details as the response
        res.json(animeDetails);
    } catch (error) {
        console.error('Error fetching anime list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const url = `https://api.jikan.moe/v4/anime/${id}/reviews`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        const reviews = get_reviews_from_json(json);
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching anime list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

function get_reviews_from_json(json_object) {
  if (!json_object || !json_object.data) {
    console.error("Invalid JSON object");
    return [];
  }

  const reviewsData = json_object.data;

  if (!reviewsData || !Array.isArray(reviewsData)) {
    console.error("Invalid reviews data");
    return [];
  }

  const reviews = reviewsData.map(review => {
    return review.review || ""; // Extract the 'review' field from each review object
  });

  return reviews;
}





// get relevant details from anime object
function getAnimeDetails(anime) {
    // get title, release year, and image URL
    let title = anime.title_english;
    if (!title) {
        title = anime.title;
    }
    const releaseYear = anime.aired.prop.from.year;
    const imageUrl = anime.images.jpg.image_url;
    const id = anime.mal_id;
    const trailerUrl = anime.trailer.embed_url;
    const episodes = anime.episodes;
    const score = anime.score;
    const aired = anime.aired.string;
    const episodesDuration = anime.duration;
    const synopsis = anime.synopsis;
    const genres = anime.genres.map(genre => genre.name);
    const themes = anime.themes.map(theme => theme.name);
    const bigImageUrl = anime.trailer.images.maximum_image_url;

    console.log(`Title: ${title}, Release Year: ${releaseYear}, Image URL: ${imageUrl}, ID: ${id}, Trailer URL: ${trailerUrl}, Episodes: ${episodes}, Score: ${score}, Aired: ${aired}, Episodes Duration: ${episodesDuration}, Synopsis: ${synopsis}, Genres: ${genres}, Themes: ${themes}`);

    // Return relevant details as an object
    return {
        title,
        releaseYear,
        imageUrl,
        id, 
        trailerUrl,
        episodes,
        score,
        aired,
        episodesDuration,
        synopsis,
        genres,
        themes, 
        bigImageUrl,
    };
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})