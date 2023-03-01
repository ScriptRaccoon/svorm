<script lang="ts">
	import { goto } from "$app/navigation";

	let id: string = "";
</script>

<h2>Submit a Svorm</h2>

<label>
	Svorm ID
	<input type="text" bind:value={id} />
</label>

<menu>
	<button on:click={() => goto(`/submit/${id}`)}>Go</button>
</menu>

<style>
	menu {
		text-align: center;
		margin-top: 1rem;
	}
</style>
