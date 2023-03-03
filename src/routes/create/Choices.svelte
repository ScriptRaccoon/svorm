<script lang="ts">
	import Fa from "svelte-fa";
	import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

	export let choices: string[];

	let next_choice: string = "";
	let choice_input: HTMLInputElement;

	function add_choice(): void {
		choices = [...choices, next_choice];
		next_choice = "";
		choice_input.focus();
	}

	function delete_choice(index: number): void {
		choices.splice(index, 1);
		choices = choices;
	}
</script>

{#if choices.length > 0}
	<h4>Choices</h4>
	<ol>
		{#each choices as choice, index}
			<li>
				<span>{choice}</span>
				<button
					aria-label="delete {choice}"
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
	<p>Add at least one choice</p>
{/if}

<form on:submit|preventDefault={add_choice}>
	<input
		type="text"
		aria-label="choice"
		required
		bind:value={next_choice}
		bind:this={choice_input}
	/>
	<button class="small" aria-label="Add choice">
		<Fa icon={faPlus} />
	</button>
</form>

<style lang="scss">
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	h4 {
		font-weight: initial;
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
