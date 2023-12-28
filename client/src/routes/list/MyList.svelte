<script>
	import AnimeCard from "../AnimeCard.svelte";
	import AnimeCardDelete from "../AnimeCardDelete.svelte";
	import { onMount } from "svelte";
	import { userStoreObject } from "../../store.js";

	// get the animeList from the server
	let animeList = [];
	let currentUser = "";

	userStoreObject.subscribe((value) => {
		currentUser = value.user.id;
	});

	console.log(currentUser, "is currently logged in");

	onMount(async () => {
		try {
			const response = await fetch("http://localhost:4001/db/getLikedAnime", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: currentUser,
				}),
			});
			const data = await response.json();
			animeList = data.map((anime) => anime.anime_object);
			console.log("Anime list:", animeList);
		} catch (error) {
			console.error("Error fetching anime list:", error);
		}
	});
</script>

<h1 class="max-w-lg text-3xl font-semibold leading-normal text-green-700 mb-10">
	My Watch List
</h1>
<div class="grid gap-x-2 gap-y-4 grid-cols-4">
	{#each animeList as anime (anime.id)}
		<AnimeCardDelete {anime} />
	{/each}
</div>

<style>
	/* Add specific styles for the AnimeList component here */
</style>
