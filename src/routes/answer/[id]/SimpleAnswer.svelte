<script lang="ts">
	export let question: question_db;
	export let answer: string;
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

<label>
	Answer
	<input type="text" bind:value={answer} />
</label>
