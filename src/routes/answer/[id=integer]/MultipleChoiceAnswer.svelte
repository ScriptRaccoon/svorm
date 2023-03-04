<script lang="ts">
	import { LABELS } from "@/config";

	export let question: multiple_choice_db;
	export let choices_object: Record<string, number> = {};

	function reset_choice() {
		delete choices_object[question.id];
		choices_object = choices_object;
	}
</script>

<div class="choices">
	{#each question.choices as choice, index}
		<label>
			<input
				type="radio"
				value={index}
				bind:group={choices_object[question.id]}
			/>
			<span>{choice}</span>
		</label>
	{/each}
</div>

<menu>
	<button type="button" on:click={reset_choice} class="small">
		{LABELS.RESET}
	</button>
</menu>

<style>
	.choices {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
