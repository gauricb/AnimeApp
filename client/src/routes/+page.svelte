<script>
	import Search from "./Search.svelte";
	import AnimeList from "./AnimeList.svelte";
	import OptionsNavbar from "./OptionsNavbar.svelte";
</script>

<!-- src/routes/Index.svelte -->

<main>
	<Search />
	<OptionsNavbar />

	<div class="p-8">
		<AnimeList />
	</div>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
