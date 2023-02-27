<script lang="ts">
	import MultipleChoiceSubmission from "./MultipleChoiceSubmission.svelte";
	import QuestionSubmission from "./QuestionSubmission.svelte";
	export let element: element_submission;
	export let index: number;
</script>

<div class="element">
	{#if "choices" in element}
		<MultipleChoiceSubmission bind:element />
	{:else}
		<QuestionSubmission bind:element {index} />
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
