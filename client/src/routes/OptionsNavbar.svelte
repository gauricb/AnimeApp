<script>
	import { userStoreObject } from "../store.js";

	let currentUser = "";

	userStoreObject.subscribe((value) => {
		currentUser = value.user.email;
	});
	console.log(currentUser, "is currently logged in");
</script>

<ul class="flex border-b">
	<li class="-mb-px mr-1">
		<a
			class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-lime-700 font-semibold"
			href="/">Discover</a
		>
	</li>
	<li class="mr-1">
		<a
			class="bg-white inline-block py-2 px-4 text-lime-700 hover:text-lime-600 font-semibold"
			href="/list">My List</a
		>
	</li>
	<li class="ml-auto py-2 px-4 text-lime-700 font-semibold">{currentUser}</li>
</ul>
