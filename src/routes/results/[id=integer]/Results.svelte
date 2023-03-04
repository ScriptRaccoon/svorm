<script lang="ts">
	import { HEADINGS } from "@/config";
	import Result from "./Result.svelte";

	export let title: string;
	export let results: question_results[];
</script>

<h2>
	{title} &ndash; {HEADINGS.RESULTS_SHORT}
</h2>

<ol class="cards">
	{#each results as result}
		<li>
			<Result {result} />
		</li>
	{/each}
</ol>
