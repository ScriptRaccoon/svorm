<script lang="ts">
	import { onMount } from "svelte";

	export let element: question;
	export let index: number;
	let input: HTMLInputElement;
	onMount(() => {
		input?.focus();
	});
</script>

<p>
	<label for="question{index}"> Question </label>
	<input
		type="text"
		id="question{index}"
		bind:value={element.question}
		bind:this={input}
	/>
</p>
