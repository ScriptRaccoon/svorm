<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import ChoiceElement from "./ChoiceElement.svelte";
	import QuestionElement from "./QuestionElement.svelte";
	export let data: formElement;
	const dispatch = createEventDispatcher();
</script>

<div class="element">
	{#if "question" in data}
		<QuestionElement bind:data />
	{:else}
		<ChoiceElement bind:data />
	{/if}
	<p>
		<label for="required + {data.id}"> Required </label>
		<input type="checkbox" id="required + {data.id}" bind:checked={data.required} />
	</p>
	<button on:click={() => dispatch("delete")}>Delete this element</button>
</div>

<style>
	.element {
		background-color: #eee;
		padding: 1rem;
	}
</style>
