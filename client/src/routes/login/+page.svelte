<script>
	import skull from "../../assets/one-piece-skull.png";
	import { userStoreObject } from "../../store.js";
	let alert = false;
	let email = "";
	let password = "";

	const handleSignIn = async () => {
		// make call to the login endpoint
		try {
			const response = await fetch("http://localhost:4000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Authentication successful, navigate to the next page
				userStoreObject.set({
					user: data.user,
					session: data.session,
				});
				window.location.href = "/";
			} else {
				alert = true;
				console.error("Invalid credentials");
			}
		} catch (error) {
			console.error("Error signing in:", error.message);
		}
	};
</script>

<div class="bg-lime-700 p-4 flex justify-between items-center">
	<h1 class="text-white text-2xl font-bold">AniME</h1>
</div>

<section class="bg-gray-50 dark:bg-gray-900">
	{#if alert}
		<div
			class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
			role="alert"
		>
			<span class="font-medium">Invalid credentials</span> Please try again.
		</div>
	{/if}
	<div
		class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
	>
		<a
			href="#"
			class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<img class="w-24 h-24 mr-2" src={skull} alt="logo" />
			Welcome back Anime fan!
			<img class="w-24 h-24 mr-2" src={skull} alt="logo" />
		</a>
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form
					class="space-y-4 md:space-y-6"
					on:submit|preventDefault={handleSignIn}
				>
					<div>
						<label
							for="email"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Your email</label
						>
						<input
							bind:value={email}
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="name@company.com"
							required=""
						/>
					</div>
					<div>
						<label
							for="password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Password</label
						>
						<input
							bind:value={password}
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required=""
						/>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-start">
							<div class="flex items-center h-5">
								<input
									id="remember"
									aria-describedby="remember"
									type="checkbox"
									class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
									required=""
								/>
							</div>
							<div class="ml-3 text-sm">
								<label for="remember" class="text-gray-500 dark:text-gray-300"
									>Remember me</label
								>
							</div>
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-lime-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>
						Sign in
					</button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don’t have an account yet? <a
							href="/register"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>Sign up</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
