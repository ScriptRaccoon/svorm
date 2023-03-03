<script lang="ts">
	import type { PageData } from "./$types";
	import Answer from "./Answer.svelte";
	export let data: PageData;
	const { svorm, questions } = data;
</script>

<Answer {svorm} {questions} />
