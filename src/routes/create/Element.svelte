<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import MultipleChoice from "./MultipleChoice.svelte";
	import Question from "./Question.svelte";
	export let element: element;
	const dispatch = createEventDispatcher();
</script>

<div class="element">
	{#if "choices" in element}
		<h3>Multiple Choice</h3>
		<MultipleChoice bind:element />
	{:else}
		<h3>Question</h3>
		<Question bind:element />
	{/if}
	<p>
		<label for="required + {element.id}">Required</label>
		<input
			type="checkbox"
			id="required + {element.id}"
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
		background-color: var(--light-color);
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0.1rem 0.1rem 0.4rem #0006;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
