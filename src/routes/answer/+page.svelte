<script lang="ts">
	import { goto } from "$app/navigation";
	import { HEADINGS, LABELS } from "@/config";
	import Loader from "@/lib/Loader.svelte";
	import { onMount } from "svelte";

	let id: number;

	let input: HTMLElement;

	let loading = false;

	onMount(() => input.focus());

	function goto_svorm() {
		loading = true;
		goto(`/answer/${id}`);
	}
</script>

<h2>{HEADINGS.ANSWER}</h2>

<form on:submit|preventDefault={goto_svorm}>
	<label>
		{LABELS.SVORM_ID}
		<input type="number" bind:value={id} bind:this={input} />
	</label>

	<menu>
		<button>{LABELS.SUBMIT_ID}</button>
	</menu>
</form>

<Loader {loading} />

<style>
	menu {
		text-align: center;
		margin-block: 1rem;
	}
</style>
