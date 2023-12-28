<!-- src/components/AnimeCard.svelte -->
<script>
	import { navigate } from "svelte-routing";
	import { animeStoreObject } from "../store.js";
	import GenreButton from "./GenreButton.svelte";

	export let anime;

	function handleCardClick() {
		console.log(`Clicked on ${anime.id}`);
		// update store here
		animeStoreObject.set({
			id: anime.id,
			title: anime.title,
			releaseYear: anime.releaseYear,
			imageUrl: anime.imageUrl,
			aired: anime.aired,
			episodes: anime.episodes,
			episodesDuration: anime.episodesDuration,
			genres: anime.genres,
			score: anime.score,
			synopsis: anime.synopsis,
			themes: anime.themes,
			trailerUrl: anime.trailerUrl,
			bigImageUrl: anime.bigImageUrl,
		});

		window.location.href = `/anime-card/${anime.id}`;
	}

	let animeGenres = anime.genres;
</script>

<div
	class="max-w-xs h-80 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col"
	on:click={handleCardClick}
>
	<img
		src={anime.imageUrl}
		alt={anime.title}
		class="w-full h-40 object-cover mb-4 rounded-md"
	/>

	<div class="flex justify-between items-start flex-1 flex-col">
		<h2 class="text-lg font-bold">{anime.title}</h2>

		<p class="text-sm text-gray-600">
			{anime.releaseYear}
		</p>
		<div>
			<GenreButton {animeGenres} />
		</div>
	</div>
</div>

<style>
</style>
