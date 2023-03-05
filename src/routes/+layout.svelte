<script>
	import "./app.scss";
	import Nav from "@/lib/Nav.svelte";
	import { TEXT } from "@/config";
</script>

<svelte:head>
	<title>{TEXT.TITLE}</title>
	<meta property="og:title" content="Svorm" />
	<meta
		property="og:description"
		content="Create forms and share them with others."
	/>
	<meta
		name="description"
		content="Create forms and share them with others."
	/>
	<meta property="og:type" content="Website" />
	<meta property="og:url" content="https://svorm.netlify.app" />
	<meta property="og:site_name" content="Svorm" />
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
