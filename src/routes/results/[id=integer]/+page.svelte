<script lang="ts">
	import type { PageData } from "./$types";
	import Results from "./Results.svelte";
	export let data: PageData;
	const { svorm_with_results } = data;
	const { title, results } = svorm_with_results;
</script>

<Results {title} {results} />
