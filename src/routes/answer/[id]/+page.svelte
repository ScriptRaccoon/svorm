<script lang="ts">
	import type { PageData } from "./$types";
	import Answer from "./Answer.svelte";

	export let data: PageData;

	const { svorm, elements } = data;
</script>

<Answer {svorm} {elements} />
