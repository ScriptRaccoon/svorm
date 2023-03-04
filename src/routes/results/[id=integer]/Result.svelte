<script lang="ts">
	import { frequency } from "@/utils";
	export let result: question_results;
</script>

<h3>{result.question}</h3>
{#if "choices" in result}
	<ul class="choices">
		{#each result.choices as choice, index}
			{@const f = frequency(result.results, index)}
			<li>
				<span class="frequency">{f}</span>
				&times; {choice}
			</li>
		{/each}
	</ul>
{:else if result.results.length > 0}
	<ul class="answers">
		{#each result.results as answer}
			<li>{answer}</li>
		{/each}
	</ul>
{:else}
	<i>There are no answers so far</i>
{/if}

<style>
	.choices {
		list-style-type: none;
	}
	.answers {
		list-style-type: disc;
		padding-left: 1rem;
	}
	.frequency {
		font-weight: bold;
	}
</style>
