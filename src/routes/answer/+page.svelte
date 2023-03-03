<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let id: number;

	let input: HTMLElement;

	onMount(() => input.focus());

	function goto_svorm() {
		goto(`/answer/${id}`);
	}
</script>

<h2>Answer a svorm</h2>

<form on:submit|preventDefault={goto_svorm}>
	<label>
		Svorm ID
		<input type="number" bind:value={id} bind:this={input} />
	</label>

	<menu>
		<button>Submit ID</button>
	</menu>
</form>

<style>
	menu {
		text-align: center;
		margin-top: 1rem;
	}
</style>
