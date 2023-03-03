<script lang="ts">
	import { LABELS } from "@/config";
	export let question: simple_question_db_answer;
</script>

<label>
	{LABELS.ANSWER}
	<input type="text" bind:value={question.answer} />
</label>
