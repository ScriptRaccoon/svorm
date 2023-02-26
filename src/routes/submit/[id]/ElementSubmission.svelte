<script lang="ts">
	import ChoiceSubmission from "./ChoiceSubmission.svelte";
	import QuestionSubmission from "./QuestionElementView.svelte";
	export let element: svormElementSubmission;
</script>

<div class="element">
	{#if "question" in element}
		<QuestionSubmission bind:element />
	{:else}
		<ChoiceSubmission bind:element />
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
