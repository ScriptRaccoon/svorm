<script lang="ts">
	export let question: multiple_choice_db_answer;
</script>

<div class="choices">
	{#each question.choices as choice, index}
		<label>
			<input
				type="radio"
				value={index}
				bind:group={question.choice}
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
