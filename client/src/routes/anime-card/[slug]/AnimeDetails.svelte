<!-- AnimeDetails.svelte -->
<script>
	import { userStoreObject } from "../../../store.js";
	import { onMount } from "svelte";
	export let animeObject;

	let currentUser = "";
	let isInFavorites = false;

	userStoreObject.subscribe((value) => {
		currentUser = value.user.id;
	});

	let numPositiveReviews = 0;
	let numNegativeReviews = 0;
	let numReviews = 0;

	// Mock values for demonstration purposes
	let percentPositive = 0;
	let percentNegative = 0;

	// get the percentage and number from api
	onMount(async () => {
		// Replace 'animeId' with the actual anime ID
		const animeId = animeObject.id;
		console.log(typeof parseInt(animeId), parseInt(animeId));
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/analyze_sentiment?id=${animeId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				percentPositive = result.percent_positive_reviews;
				percentNegative = result.percent_negative_reviews;
				numPositiveReviews = result.num_positive_reviews;
				numNegativeReviews = result.num_negative_reviews;
				console.log("Percent positive:", percentPositive);
				console.log("Percent negative:", percentNegative);
			} else {
				console.error("Error analyzing sentiment:", response.statusText);
			}
		} catch (error) {
			console.error("Error analyzing sentiment:", error);
		}
	});

	async function addToFavorites() {
		console.log(`Added ${animeObject.title} to favorites!`);

		try {
			const response = await fetch("http://localhost:4001/db/addAnime", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: currentUser,
					anime_object: animeObject,
				}),
			});

			if (response.status === 400) {
				alert(`❌ ${animeObject.title} is already in favorites!`);
				console.error("Anime already in favorites");
				isInFavorites = true;
			} else if (response.status === 200) {
				alert(`🌟 Added ${animeObject.title} to favorites!`);
			} else {
				console.error("Error adding anime to favorites");
			}
		} catch (error) {
			console.error("Error adding anime to favorites:", error);
		}
	}
	console.log(isInFavorites);
</script>

<div class="max-w-6xl mx-auto mt-8 p-6 bg-green-200 rounded-lg shadow-md">
	<img
		src={animeObject.imageUrl}
		alt={animeObject.title}
		class="w-48 h-48 object-cover mb-4 rounded-md"
	/>

	<div class="flex justify-between items-center mb-4">
		<h2 class="text-3xl font-bold text-green-800">{animeObject.title}</h2>
		<button
			disabled={isInFavorites}
			class="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
			on:click={addToFavorites}
		>
			🌟 Add to Favorites
		</button>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		<div>
			<p class="text-gray-600 font-semibold">
				📅 Release Year: {animeObject.releaseYear}
			</p>
			<p class="text-gray-600 font-semibold">
				📺 Aired: {animeObject.aired}
			</p>
			<p class="text-gray-600 font-semibold">
				🎬 Episodes: {animeObject.episodes}
			</p>
			<p class="text-gray-600 font-semibold">
				⏱️ Duration: {animeObject.episodesDuration}
			</p>
			<p class="text-gray-600 font-semibold">
				🌟 Score: {animeObject.score}
			</p>
		</div>

		<div>
			<h3 class="text-lg font-semibold mb-2 text-gray-800">
				Sentiment Analysis of Reviews
			</h3>
			<div class="flex items-center space-x-4">
				<div class="w-1/2">
					<p class="text-gray-600 font-semibold">
						Positive Reviews: {percentPositive}%
					</p>
					<!-- Visualize positive reviews percentage -->
					<div class="mt-1">
						<div class="flex items-center justify-between">
							<div class="w-1/2">
								<span
									class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-lime-300"
								>
									Positive
								</span>
							</div>
							<div class="text-right">
								<span class="text-xs font-semibold inline-block text-green-600">
									{numPositiveReviews}
								</span>
							</div>
						</div>
						<div class="w-full bg-gray-200 rounded-full">
							<div
								class="w-{percentPositive} bg-green-600 rounded-full h-2"
							></div>
						</div>
					</div>
				</div>

				<div class="w-1/2">
					<p class="text-gray-600 font-semibold">
						Negative Reviews: {percentNegative}%
					</p>
					<!-- Visualize negative reviews percentage -->
					<div class="mt-1">
						<div class="flex items-center justify-between">
							<div class="w-1/2">
								<span
									class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200"
								>
									Negative
								</span>
							</div>
							<div class="text-right">
								<span class="text-xs font-semibold inline-block text-red-600">
									{numNegativeReviews}
								</span>
							</div>
						</div>
						<div class="w-full bg-gray-200 rounded-full">
							<div
								class="w-{percentNegative} bg-red-600 rounded-full h-2"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<p class="text-gray-600 font-semibold">📝 Synopsis:</p>
	<p class="text-gray-600 italic mb-4">{animeObject.synopsis}</p>

	<div class="mb-4">
		<p class="text-gray-600 font-semibold">
			🎭 Genres: {animeObject.genres.join(", ")}
		</p>
		<p class="text-gray-600 font-semibold">
			🌈 Themes: {animeObject.themes.join(", ")}
		</p>
	</div>

	{#if animeObject.trailerUrl}
		<div class="mb-4">
			<p class="text-gray-600 font-semibold">🎥 Trailer:</p>
			<iframe
				width="100%"
				height="315"
				src={animeObject.trailerUrl}
				title="YouTube Video Player"
				frameborder="0"
				allowfullscreen
			></iframe>
		</div>
	{/if}

	<button
		disabled={isInFavorites}
		class="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
		on:click={addToFavorites}
	>
		🌟 Add to Favorites
	</button>
</div>

<style>
	/* Add specific styles for the AnimeDetails component here */
</style>
