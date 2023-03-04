<script lang="ts">
	export let question: multiple_choice_db;
	export let choices_object: Record<string, number> = {};
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

<style>
	.choices {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
