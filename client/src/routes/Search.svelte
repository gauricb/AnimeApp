<script>
	import skull from "../assets/one-piece-skull.png";
	let anime = "";

	function searchAnime() {
		console.log(`Searching for Anime: ${anime}`);
		// Perform your search logic here
		window.location.href = `/login`;
	}

	function handleKeyPress(event) {
		if (event.key === "Enter") {
			searchAnime();
		}
	}
</script>

<div class="bg-lime-700 p-4 flex justify-between items-center">
	<h1 class="text-white text-2xl font-bold">AniME</h1>
	<div class="flex items-center">
		<button
			class="ml-2 px-4 py-2 bg-white text-lime-700 rounded-lg hover:bg-lime-100 hover:text-lime-700"
			on:click={searchAnime}
		>
			Logout
		</button>
	</div>
</div>
