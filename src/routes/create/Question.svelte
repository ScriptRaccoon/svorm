<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Choices from "./Choices.svelte";
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";
	import { HEADINGS, LABELS } from "@/config";
	import Asterisk from "@/lib/Asterisk.svelte";

	const dispatch = createEventDispatcher();

	export let question: question;

	let title =
		"choices" in question
			? HEADINGS.MULTPLE_CHOICE
			: HEADINGS.SIMPLE_QUESTION;
</script>

<div class="card">
	<header>
		<h3>{title}</h3>
		<button
			aria-label={LABELS.DELETE_QUESTION}
			class="small danger"
			on:click={() => dispatch("delete")}
		>
			<Fa icon={faTrash} />
		</button>
	</header>

	<label>
		{LABELS.QUESTION}<Asterisk />
		<input type="text" bind:value={question.question} />
	</label>

	{#if "choices" in question}
		<Choices bind:choices={question.choices} />
	{/if}

	<label>
		{LABELS.REQUIRED}
		<input type="checkbox" bind:checked={question.required} />
	</label>
</div>

<style lang="scss">
	h3 {
		text-transform: uppercase;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
