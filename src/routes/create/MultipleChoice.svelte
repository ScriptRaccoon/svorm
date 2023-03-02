<script lang="ts">
	import Fa from "svelte-fa";
	import { faTrash } from "@fortawesome/free-solid-svg-icons";
	import { onMount, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let element: multiple_choice;
	export let index: number;
	let next_choice: string = "";
	let title_input: HTMLInputElement;
	let choice_input: HTMLInputElement;
	onMount(() => {
		title_input?.focus();
	});

	function add_choice(): void {
		element.choices = [...element.choices, next_choice];
		next_choice = "";
		choice_input.focus();
	}

	function delete_choice(index: number): void {
		element.choices.splice(index, 1);
		element.choices = element.choices;
	}
</script>

<div class="header">
	<h3>Multiple Choice</h3>
	<button class="small danger" on:click={() => dispatch("delete")}>
		<Fa icon={faTrash} />
	</button>
</div>

<p>
	<label for="question{index}">Question</label>
	<input
		type="text"
		id="question{index}"
		bind:value={element.question}
		bind:this={title_input}
	/>
</p>

{#if element.choices.length > 0}
	<p>Choices</p>
	<ol>
		{#each element.choices as choice, index}
			<li>
				<span>{choice}</span>
				<button
					class="small danger"
					type="button"
					on:click={() => delete_choice(index)}
				>
					<Fa icon={faTrash} />
				</button>
			</li>
		{/each}
	</ol>
{:else}
	<p>No choice has been added so far</p>
{/if}

<form on:submit|preventDefault={add_choice}>
	<input
		aria-label="choice"
		type="text"
		bind:value={next_choice}
		required
		bind:this={choice_input}
	/>
	<button>Add choice</button>
</form>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	ol {
		padding-left: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1rem;

		button {
			float: right;
		}
	}
</style>
