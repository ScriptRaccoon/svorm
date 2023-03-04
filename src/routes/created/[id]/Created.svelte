<script>
	import { page } from "$app/stores";
	import { HEADINGS, TEXT } from "@/config";
	const id = $page.params.id;
	const answer_url = `${$page.url.origin}/answer/${id}`;
	const results_url = `${$page.url.origin}/results/${id}`;
</script>

<h2>{HEADINGS.CREATED}</h2>

<p>{TEXT.LINK}</p>

<p class="link">
	<a href={answer_url}>{answer_url}</a>
</p>

<p class="link">
	<a href={results_url}>{results_url}</a>
</p>

<style>
	.link {
		margin-top: 1rem;
	}
</style>
