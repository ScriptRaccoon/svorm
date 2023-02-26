<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	const id = $page.params.id;
	if (!id) goto("/");
</script>

<h2>Svorm has been created</h2>

<p>ID: {id}</p>
