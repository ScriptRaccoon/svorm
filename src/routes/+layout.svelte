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
	<meta property="og:image" content="./slogo.jpg" />

	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="./apple-touch-icon.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="./favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="./favicon-16x16.png"
	/>
	<link rel="manifest" href="/site.webmanifest" />
	<link
		rel="mask-icon"
		href="./safari-pinned-tab.svg"
		color="#5bbad5"
	/>
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Nav />

<main aria-live="polite">
	<slot />
</main>

<style>
	main {
		padding: 1rem;
		max-width: 38rem;
		margin: 0 auto;
	}
</style>
