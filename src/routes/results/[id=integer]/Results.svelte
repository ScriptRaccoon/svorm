<script lang="ts">
	import { HEADINGS } from "@/config";
	import { frequency } from "@/utils";
	import Result from "./Result.svelte";

	export let title: string;
	export let results: question_results[];
</script>

<h2>
	{title} &ndash; {HEADINGS.RESULTS_SHORT}
</h2>

<ol class="questions">
	{#each results as result}
		<li class="question">
			<Result {result} />
		</li>
	{/each}
</ol>
