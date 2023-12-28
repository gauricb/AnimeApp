<!-- src/components/AnimeList.svelte -->
<script>
	import AnimeCard from "./AnimeCard.svelte";
	import { onMount } from "svelte";

	// get the animeList from the server
	let animeList = [];

	onMount(async () => {
		try {
			const response = await fetch("http://localhost:4002/animeList");
			const data = await response.json();
			animeList = data;
			console.log("Anime list:", animeList);
		} catch (error) {
			console.error("Error fetching anime list:", error);
		}
	});
</script>

<div class="grid gap-x-2 gap-y-4 grid-cols-4">
	{#each animeList as anime (anime.id)}
		<AnimeCard {anime} />
	{/each}
</div>

<style>
</style>
