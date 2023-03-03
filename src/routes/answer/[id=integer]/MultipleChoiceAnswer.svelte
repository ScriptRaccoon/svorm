<script lang="ts">
	export let question: multiple_choice_db_answer;
</script>

<h3>
	{question.question}{#if question.required}
		<span
			class="danger"
			aria-hidden="true"
			aria-describedby="required">*</span
		>
	{/if}
</h3>

<div class="choices">
	{#each question.choices as _choice, index}
		<label>
			<input
				type="radio"
				value={index}
				bind:group={question.choice}
			/>
			<span>{_choice}</span>
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
