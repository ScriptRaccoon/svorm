<script>
	import { page } from "$app/stores";
	const id = $page.params.id;
	const url = `${$page.url.origin}/submission/${id}`;
</script>

<h2>Svorm has been created</h2>

<p>Here is the link to your svorm:</p>

<p class="link">
	<a href={url}>{url}</a>
</p>

<style>
	.link {
		margin-top: 1rem;
	}
</style>
