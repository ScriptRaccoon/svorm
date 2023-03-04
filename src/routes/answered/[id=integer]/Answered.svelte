<script lang="ts">
	import { HEADINGS, TEXT } from "@/config";
	import { page } from "$app/stores";
	const id = $page.params.id;
	const origin_url = $page.url.origin;
	const results_url = `${origin_url}/results/${id}`;
</script>

<h2>{HEADINGS.SUCCESS}</h2>

<p>{TEXT.THANKS}</p>

<br />

<p>You can see the results here:</p>

<a href={results_url}>{results_url}</a>
