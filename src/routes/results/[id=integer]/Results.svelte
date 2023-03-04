<script lang="ts">
	import { frequency } from "@/utils";

	export let title: string;
	export let results: question_results[];
</script>

<h2>
	{title} &ndash; Results
</h2>

{#each results as result}
	<h3>{result.question}</h3>
	{#if "choices" in result}
		{#each result.choices as choice, index}
			{@const f = frequency(result.results, index)}
			<p>{f} &times; {choice}</p>
		{/each}
	{:else}
		{#each result.results as answer}
			<p>{answer}</p>
		{/each}
	{/if}
{/each}
