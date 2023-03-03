<script>
	import "./app.scss";
	import Nav from "@/lib/Nav.svelte";
	import { TEXT } from "@/config";
</script>

<svelte:head>
	<title>{TEXT.TITLE}</title>
</svelte:head>

<Nav />
<main>
	<slot />
</main>

<style>
	main {
		padding: 1rem;
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
