<script lang="ts">
	import Fa from "svelte-fa";
	import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

	export let element: multiple_choice;

	let next_choice: string = "";
	let choice_input: HTMLInputElement;

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
	<button class="small" aria-label="Add choice"
		><Fa icon={faPlus} /></button
	>
</form>

<style lang="scss">
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
