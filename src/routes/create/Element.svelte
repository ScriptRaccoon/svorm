<script lang="ts">
	import MultipleChoice from "./MultipleChoice.svelte";
	import Question from "./Question.svelte";
	export let element: element;
	export let index: number;
</script>

<div class="element">
	{#if "choices" in element}
		<MultipleChoice {index} bind:element on:delete />
	{:else}
		<Question {index} bind:element on:delete />
	{/if}
	<p>
		<label for="required{index}">Required</label>
		<input
			type="checkbox"
			id="required{index}"
			bind:checked={element.required}
		/>
	</p>
	<menu />
</div>

<style lang="scss">
	.element {
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: var(--light-color);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;

		:global(h3) {
			text-transform: uppercase;
		}
	}
</style>
