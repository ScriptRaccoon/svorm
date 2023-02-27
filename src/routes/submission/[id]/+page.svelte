<script lang="ts">
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";
	import Submission from "./Submission.svelte";

	export let data: PageData;

	const { svorm } = data;

	if (!svorm) {
		goto("/");
	}
</script>

{#if svorm}
	<Submission {svorm} />
{/if}
