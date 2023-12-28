<script>
	import OptionsNavbar from "../OptionsNavbar.svelte";
	import MyList from "./MyList.svelte";
	let anime = "";

	function searchAnime() {
		console.log(`Searching for Anime: ${anime}`);
		// Perform your search logic here
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			searchAnime();
		}
	}
</script>

<div class="bg-lime-700 p-4 flex justify-between items-center">
	<h1 class="text-white text-2xl font-bold">AniME</h1>
</div>

<OptionsNavbar />

<div class="p-8">
	<MyList />
</div>
