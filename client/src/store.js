import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

const initAnimeStore = () => {
    const storedData = isBrowser ? localStorage.getItem('animeStoreObject') : null;
    return writable(storedData ? JSON.parse(storedData) : {
        id: 0,
        title: 'One Piece',
        releaseYear: 1999,
        imageUrl: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
        aired: "Oct 20, 1999 to ?",
        episodes: 1000,
        episodesDuration: "23 min per ep",
        genres: ["Action", "Adventure", "Comedy", "Super Power", "Drama", "Fantasy", "Shounen"],
        score: 8.53,
        synopsis: "Pirates fight each other and the government for treasure and power.",
        themes: ["Pirates", "Treasure", "Adventure"],
        trailerUrl: "https://www.youtube.com/embed/2uq34TeWEdQ",
        bigImageUrl: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    });
};

// Function to initialize the user store
const initUserStore = () => {
    const storedUserData = isBrowser ? localStorage.getItem('userStoreObject') : null;
    return writable(storedUserData ? JSON.parse(storedUserData) : {
        user: {},
        session: {},
    });
};


export const animeStoreObject = initAnimeStore();
export const userStoreObject = initUserStore();

if (isBrowser) {
    animeStoreObject.subscribe($animeStoreObject => {
        localStorage.setItem('animeStoreObject', JSON.stringify($animeStoreObject));
    });
    // Subscribe to changes in the user store and update the localStorage
    userStoreObject.subscribe($userStoreObject => {
        localStorage.setItem('userStoreObject', JSON.stringify($userStoreObject));
    });
}
