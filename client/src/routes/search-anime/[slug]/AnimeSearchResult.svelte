<!-- src/components/AnimeDetail.svelte -->
<script>
	import { page } from "$app/stores";

	import OptionsNavbar from "../../OptionsNavbar.svelte";

	const animeName = $page.params.slug;
	console.log(animeName);

	let animeObject = {};
</script>

<div class="bg-lime-700 p-4 flex justify-between items-center">
	<h1 class="text-white text-2xl font-bold">AniME</h1>
</div>
<OptionsNavbar />
