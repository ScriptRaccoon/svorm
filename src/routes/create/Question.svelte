<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
	import Choices from "./Choices.svelte";
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";
	import { HEADINGS, LABELS, TEXT } from "@/config";

	const dispatch = createEventDispatcher();

	export let question: question;

	let title =
		"choices" in question
			? HEADINGS.MULTPLE_CHOICE
			: HEADINGS.SIMPLE_QUESTION;

	let question_input: HTMLElement;

	onMount(() => {
		question_input?.focus();
	});
</script>

<div class="question">
	<div class="header">
		<h3>{title}</h3>
		<button
			aria-label={LABELS.DELETE_QUESTION}
			class="small danger"
			on:click={() => dispatch("delete")}
		>
			<Fa icon={faTrash} />
		</button>
	</div>
	<p>
		<label>
			{LABELS.QUESTION}
			<input
				type="text"
				bind:value={question.question}
				bind:this={question_input}
			/>
		</label>
	</p>
	{#if "choices" in question}
		<Choices bind:choices={question.choices} />
	{/if}
	<p>
		<label>
			{TEXT.REQUIRED}
			<input type="checkbox" bind:checked={question.required} />
		</label>
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
