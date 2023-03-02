<script lang="ts">
	export let question: question_db;
	export let answer: string;
</script>

<h3>
	{question.question}{#if question.required}
		<sup aria-hidden="true" aria-describedby="required">*</sup>
	{/if}
</h3>

<label>
	Answer
	<input type="text" bind:value={answer} />
</label>

<style>
	sup {
		color: var(--danger-color);
	}
</style>
