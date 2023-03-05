<script lang="ts">
	import { TEXT } from "@/config";
	export let question: simple_question_db;
	export let simple_questions_results: simple_question_result[];
	const result: string[] =
		simple_questions_results.find((r) => r.question_id == question.id)
			?.result ?? [];
</script>

{#if result.length > 0}
	<ul class="answers">
		{#each result as answer}
			<li>{answer}</li>
		{/each}
	</ul>
{:else}
	<i>{TEXT.NO_ANSWERS}</i>
{/if}

<style>
	.answers {
		list-style-type: disc;
		padding-left: 1rem;
	}
</style>
