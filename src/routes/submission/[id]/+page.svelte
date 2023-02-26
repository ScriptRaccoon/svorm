<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import type { PageData } from "./$types";
	import Submission from "./Submission.svelte";

	export let data: PageData;

	const { svorm } = data;

	if (!svorm && browser) {
		window.alert("There is no svorm for this ID");
		goto("/");
	}
</script>

{#if svorm}
	<Submission {svorm} />
{/if}
