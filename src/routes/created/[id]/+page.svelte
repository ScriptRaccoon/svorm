<script>
	import { page } from "$app/stores";
	const id = $page.params.id;
	const url = `${$page.url.origin}/view/${id}`;
</script>

<h2>Svorm has been created</h2>

<p>Here is the link of your svorm:</p>

<p>
	<a href={url}>{url}</a>
</p>
