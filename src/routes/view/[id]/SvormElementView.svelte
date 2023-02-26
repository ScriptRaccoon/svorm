<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ChoiceElementView from "./ChoiceElementView.svelte";
	import QuestionElementView from "./QuestionElementView.svelte";
	export let element: svormElementView;
</script>

<div class="element">
	{#if "question" in element}
		<QuestionElementView bind:element />
	{:else}
		<ChoiceElementView bind:element />
	{/if}
</div>

<style>
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
