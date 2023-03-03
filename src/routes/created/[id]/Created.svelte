<script>
	import { page } from "$app/stores";
	import { HEADINGS, TEXT } from "@/config";
	const id = $page.params.id;
	const url = `${$page.url.origin}/answer/${id}`;
</script>

<h2>{HEADINGS.CREATED}</h2>

<p>{TEXT.LINK}</p>

<p class="link">
	<a href={url}>{url}</a>
</p>

<style>
	.link {
		margin-top: 1rem;
	}
</style>
