<script>
	import "./app.scss";
	import Nav from "@/lib/Nav.svelte";
</script>

<svelte:head>
	<title>Svorm</title>
</svelte:head>

<Nav />
<main>
	<slot />
</main>

<style>
	main {
		padding-inline: 1rem;
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
