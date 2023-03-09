<script lang="ts">
	import { HEADINGS } from "@/config";
	import MultipleChoiceResult from "./MultipleChoiceResult.svelte";
	import SimpleQuestionResult from "./SimpleQuestionResult.svelte";
	export let svorm: svorm_db;
	export let questions: question_db[];
	export let simple_questions_results: simple_question_result[];
	export let multiple_choices_results: multiple_choice_result[];
</script>

<h2>
	{svorm.title} &ndash; {HEADINGS.RESULTS_SHORT}
</h2>

<ol class="cards">
	{#each questions as question}
		<li>
			<div class="card">
				<h3>{question.question}</h3>
				{#if "choices" in question}
					<MultipleChoiceResult
						{question}
						{multiple_choices_results}
					/>
				{:else}
					<SimpleQuestionResult
						{question}
						{simple_questions_results}
					/>
				{/if}
			</div>
		</li>
	{/each}
</ol>
