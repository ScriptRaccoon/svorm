<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import MultipleChoice from "./MultipleChoice.svelte";
	import Question from "./Question.svelte";
	export let element: element;
	export let index: number;
	const dispatch = createEventDispatcher();
</script>

<div class="element">
	{#if "choices" in element}
		<h3>Multiple Choice</h3>
		<MultipleChoice {index} bind:element />
	{:else}
		<h3>Question</h3>
		<Question {index} bind:element />
	{/if}
	<p>
		<label for="required{index}">Required</label>
		<input
			type="checkbox"
			id="required{index}"
			bind:checked={element.required}
		/>
	</p>
	<menu>
		<button class="small danger" on:click={() => dispatch("delete")}
			>Remove</button
		>
	</menu>
</div>

<style>
	h3 {
		text-transform: uppercase;
	}
	.element {
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: var(--light-color);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
