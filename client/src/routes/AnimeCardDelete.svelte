<!-- src/components/AnimeCardDelete.svelte -->
<script>
	import { userStoreObject } from "../store.js";
	import { animeStoreObject } from "../store.js";
	import GenreButton from "./GenreButton.svelte";

	export let anime;

	let currentUser = "";

	userStoreObject.subscribe((value) => {
		currentUser = value.user.id;
	});

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

	async function handleDeleteClick(event) {
		event.stopPropagation(); // Prevent the click event from propagating to the card click handler

		try {
			const response = await fetch("http://localhost:4001/db/deleteAnime", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: currentUser,
					anime_object: anime,
				}),
			});

			if (response.status === 200) {
				alert(`Deleted ${anime.title} from favorites!`);
				window.location.href = "/list";
			} else {
				console.error("Error adding anime to favorites");
			}
		} catch (error) {
			console.error("Error adding anime to favorites:", error);
		}
	}

	let animeGenres = anime.genres;
</script>

<div
	class="max-w-xs h-80 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 flex flex-col relative"
	on:click={handleCardClick}
>
	<img
		src={anime.imageUrl}
		alt={anime.title}
		class="w-full h-40 object-cover mb-4 rounded-md"
	/>

	<div class="flex justify-between items-start flex-1 flex-col">
		<h2 class="text-lg font-bold">{anime.title}</h2>

		<p class="text-sm text-gray-600">{anime.releaseYear}</p>
		<div>
			<GenreButton {animeGenres} />
		</div>
	</div>

	<!-- Delete button with trashcan icon -->
	<button
		class="absolute bottom-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 focus:outline-none"
		on:click={handleDeleteClick}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
			/>
		</svg>
	</button>
</div>

<style>
	/* Add your custom styles here */
</style>
