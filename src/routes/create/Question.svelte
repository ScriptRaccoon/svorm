<script lang="ts">
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";
	import { onMount, createEventDispatcher } from "svelte";

	export let element: question;
	export let index: number;
	let input: HTMLInputElement;

	const dispatch = createEventDispatcher();

	onMount(() => {
		input?.focus();
	});
</script>

<div class="header">
	<h3>Question</h3>
	<button class="small danger" on:click={() => dispatch("delete")}>
		<Fa icon={faTrash} />
	</button>
</div>

<p>
	<label for="question{index}"> Question </label>
	<input
		type="text"
		id="question{index}"
		bind:value={element.question}
		bind:this={input}
	/>
</p>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
