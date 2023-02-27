<script lang="ts">
	import ChoiceSubmission from "./MultipleChoiceSubmission.svelte";
	import QuestionSubmission from "./QuestionSubmission.svelte";
	export let element: element_submission;
</script>

<div class="element">
	{#if "choices" in element}
		<ChoiceSubmission bind:element />
	{:else}
		<QuestionSubmission bind:element />
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
