<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import Choices from "./Choices.svelte";
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";

	const dispatch = createEventDispatcher();

	export let question: question;
	export let index: number;

	let title = "choices" in question ? "Multiple Choice" : "Question";

	let question_input: HTMLElement;

	onMount(() => {
		question_input?.focus();
	});
</script>

<div class="question">
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
			bind:value={question.question}
			bind:this={question_input}
		/>
	</p>
	{#if "choices" in question}
		<Choices bind:choices={question.choices} />
	{/if}
	<p>
		<label for="required{index}">Required</label>
		<input
			type="checkbox"
			id="required{index}"
			bind:checked={question.required}
		/>
	</p>
</div>

<style lang="scss">
	.question {
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
