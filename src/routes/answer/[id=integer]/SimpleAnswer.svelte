<script lang="ts">
	import { LABELS } from "@/config";
	export let question: simple_question_db;
	export let answers_object: Record<string, string> = {};
</script>

<label>
	{LABELS.ANSWER}
	<input type="text" bind:value={answers_object[question.id]} />
</label>
