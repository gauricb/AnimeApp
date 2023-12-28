<!-- src/components/AnimeDetail.svelte -->
<script>
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import AnimeDetails from "./AnimeDetails.svelte";
	import OptionsNavbar from "../../OptionsNavbar.svelte";
	import { animeStoreObject } from "../../../store.js";

	const animeId = $page.params.slug;
	console.log(animeId);

	let animeObject = {};

	animeStoreObject.subscribe((value) => {
		console.log(value);
		animeObject = value;
	});
</script>

<div class="bg-lime-700 p-4 flex justify-between items-center">
	<h1 class="text-white text-2xl font-bold">AniME</h1>
</div>
<OptionsNavbar />
<AnimeDetails {animeObject} />
<!-- Display details about the anime using the fetched data -->
