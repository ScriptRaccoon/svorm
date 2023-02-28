<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";
	import Submit from "./Submit.svelte";

	export let data: PageData;

	const { svorm, elements } = data;

	if (!svorm || !elements) {
		goto("/");
	}
</script>

{#if svorm && elements}
	<Submit {svorm} {elements} />
{/if}
