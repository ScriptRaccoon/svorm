<script lang="ts">
	import { goto } from "$app/navigation";

	let id: string = "";
</script>

<h2>Answer a Svorm</h2>

<label>
	Svorm ID
	<input type="text" bind:value={id} />
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
