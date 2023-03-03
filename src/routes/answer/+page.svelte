<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let id: number;

	let input: HTMLElement;

	onMount(() => input.focus());
</script>

<h2>Answer a svorm</h2>

<label>
	Svorm ID
	<input type="number" bind:value={id} bind:this={input} />
</label>

<menu>
	<button on:click={() => goto(`/answer/${id}`)}>Go</button>
</menu>

<style>
	menu {
		text-align: center;
		margin-top: 1rem;
	}
</style>
