<script lang="ts">
	export let element: multiple_choice_create;
	export let index: number;
	let next_choice: string = "";
	function add_choice(): void {
		element.choices = [...element.choices, next_choice];
		next_choice = "";
	}

	function delete_choice(index: number): void {
		element.choices.splice(index, 1);
		element.choices = element.choices;
	}
</script>

<p>
	<label for="question{index}">Question</label>
	<input
		type="text"
		id="question{index}"
		bind:value={element.question}
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
					on:click={() => delete_choice(index)}>x</button
				>
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
	/>
	<button>Add choice</button>
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
