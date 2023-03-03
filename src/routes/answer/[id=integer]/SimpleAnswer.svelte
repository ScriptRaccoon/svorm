<script lang="ts">
	export let question: simple_question_db_answer;
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
	<input type="text" bind:value={question.answer} />
</label>
