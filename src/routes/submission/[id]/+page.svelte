<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";
	import Submission from "./Submission.svelte";

	export let data: PageData;

	const { svorm, elements } = data;

	if (!svorm || !elements) {
		goto("/");
	}
</script>

{#if svorm && elements}
	<Submission {svorm} {elements} />
{/if}
