<script>
	export let genres;

	genres = [
		"Action",
		"Adventure",
		"Avant Garde",
		"Award Winning",
		"Boys Love",
		"Comedy",
		"Drama",
		"Fantasy",
		"Girls Love",
		"Gourmet",
		"Horror",
		"Mystery",
		"Romance",
		"Sci-Fi",
		"Slice of Life",
		"Sports",
		"Supernatural",
		"Suspense",
		"Ecchi",
		"Anthropomorphic",
		"CGDCT",
		"Childcare",
		"Combat Sports",
		"Crossdressing",
		"Delinquents",
		"Detective",
		"Educational",
		"Gag Humor",
		"Gore",
		"Harem",
		"High Stakes Game",
		"Historical",
		"Idols (Female)",
		"Idols (Male)",
		"Isekai",
		"Iyashikei",
		"Love Polygon",
		"Mahou Shoujo",
		"Martial Arts",
		"Mecha",
		"Medical",
		"Military",
		"Music",
		"Mythology",
		"Organized Crime",
		"Otaku Culture",
		"Parody",
		"Performing Arts",
		"Pets",
		"Psychological",
		"Racing",
		"Reincarnation",
		"Reverse Harem",
		"Romantic Subtext",
		"Samurai",
		"School",
		"Showbiz",
		"Space",
		"Strategy Game",
		"Super Power",
		"Survival",
		"Team Sports",
		"Time Travel",
		"Vampire",
		"Video Game",
		"Visual Arts",
		"Workplace",
		"Josei",
		"Kids",
		"Seinen",
		"Shoujo",
		"Shounen",
	];
	const genreColors = {
		Action: "bg-red-500",
		Adventure: "bg-orange-500",
		"Avant Garde": "bg-yellow-500",
		"Award Winning": "bg-purple-500",
		"Boys Love": "bg-pink-500",
		Comedy: "bg-teal-500",
		Drama: "bg-indigo-500",
		Fantasy: "bg-green-500",
		"Girls Love": "bg-pink-500",
		Gourmet: "bg-yellow-500",
		Horror: "bg-red-500",
		Mystery: "bg-purple-500",
		Romance: "bg-pink-500",
		"Sci-Fi": "bg-blue-500",
		"Slice of Life": "bg-yellow-500",
		Sports: "bg-green-500",
		Supernatural: "bg-indigo-500",
		Suspense: "bg-purple-500",
		Ecchi: "bg-pink-500",
		Erotica: "bg-red-500",
		Hentai: "bg-red-500",
		"Adult Cast": "bg-gray-500",
		Anthropomorphic: "bg-green-500",
		CGDCT: "bg-pink-500",
		Childcare: "bg-yellow-500",
		"Combat Sports": "bg-red-500",
		Crossdressing: "bg-purple-500",
		Delinquents: "bg-red-500",
		Detective: "bg-indigo-500",
		Educational: "bg-yellow-500",
		"Gag Humor": "bg-orange-500",
		Gore: "bg-red-500",
		Harem: "bg-pink-500",
		"High Stakes Game": "bg-red-500",
		Historical: "bg-indigo-500",
		"Idols (Female)": "bg-pink-500",
		"Idols (Male)": "bg-blue-500",
		Isekai: "bg-blue-500",
		Iyashikei: "bg-green-500",
		"Love Polygon": "bg-pink-500",
		"Magical Sex Shift": "bg-pink-500",
		"Mahou Shoujo": "bg-pink-500",
		"Martial Arts": "bg-red-500",
		Mecha: "bg-gray-500",
		Medical: "bg-gray-500",
		Military: "bg-green-500",
		Music: "bg-teal-500",
		Mythology: "bg-green-500",
		"Organized Crime": "bg-purple-500",
		"Otaku Culture": "bg-purple-500",
		Parody: "bg-yellow-500",
		"Performing Arts": "bg-teal-500",
		Pets: "bg-orange-500",
		Psychological: "bg-purple-500",
		Racing: "bg-red-500",
		Reincarnation: "bg-purple-500",
		"Reverse Harem": "bg-pink-500",
		"Romantic Subtext": "bg-pink-500",
		Samurai: "bg-red-500",
		School: "bg-blue-500",
		Showbiz: "bg-teal-500",
		Space: "bg-blue-500",
		"Strategy Game": "bg-green-500",
		"Super Power": "bg-orange-500",
		Survival: "bg-red-500",
		"Team Sports": "bg-green-500",
		"Time Travel": "bg-indigo-500",
		Vampire: "bg-purple-500",
		"Video Game": "bg-teal-500",
		"Visual Arts": "bg-teal-500",
		Workplace: "bg-teal-500",
		Josei: "bg-orange-500",
		Kids: "bg-yellow-500",
		Seinen: "bg-gray-500",
		Shoujo: "bg-pink-500",
		Shounen: "bg-red-500",
	};
</script>

<div class="flex flex-wrap">
	{#each genres as genre}
		<button
			class={`px-3 py-2 text-xs font-medium text-center rounded-lg text-white ${
				genreColors[genre] || "bg-gray-500"
			}`}
		>
			{genre}
		</button>
	{/each}
</div>

<style>
	/* Add any additional styles here */
</style>
