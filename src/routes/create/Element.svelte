<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import MultipleChoice from "./MultipleChoice.svelte";
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";

	const dispatch = createEventDispatcher();

	export let element: element;
	export let index: number;

	let title = "choices" in element ? "Multiple Choice" : "Question";
	let question_input: HTMLElement;

	onMount(() => {
		question_input?.focus();
	});
</script>

<div class="element">
	<div class="header">
		<h3>{title}</h3>
		<button class="small danger" on:click={() => dispatch("delete")}>
			<Fa icon={faTrash} />
		</button>
	</div>
	<p>
		<label for="question{index}">Question</label>
		<input
			type="text"
			id="question{index}"
			bind:value={element.question}
			bind:this={question_input}
		/>
	</p>
	{#if "choices" in element}
		<MultipleChoice bind:element on:delete />
	{/if}
	<p>
		<label for="required{index}">Required</label>
		<input
			type="checkbox"
			id="required{index}"
			bind:checked={element.required}
		/>
	</p>
</div>

<style lang="scss">
	.element {
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: var(--light-color);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	h3 {
		text-transform: uppercase;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
