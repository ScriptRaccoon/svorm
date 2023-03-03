<script lang="ts">
	export let question: simple_question_db_answer;
</script>

<label>
	Answer
	<input type="text" bind:value={question.answer} />
</label>
