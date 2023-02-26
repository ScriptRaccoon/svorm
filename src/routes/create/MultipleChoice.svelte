<script lang="ts">
	export let element: multipleChoice;
	let nextChoice: string = "";
	function addChoice(): void {
		element.choices = [...element.choices, nextChoice];
		nextChoice = "";
	}

	function deleteChoice(index: number): void {
		element.choices.splice(index, 1);
		element.choices = element.choices;
	}
</script>

<p>
	<label for="question + {element.id}">Question</label>
	<input type="text" id="question + {element.id}" bind:value={element.question} />
</p>

{#if element.choices.length > 0}
	<p>Choices</p>
	<ol>
		{#each element.choices as choice, index}
			<li>
				<span>{choice}</span>
				<button class="small danger" type="button" on:click={() => deleteChoice(index)}>x</button>
			</li>
		{/each}
	</ol>
{:else}
	<p>No choice has been added so far</p>
{/if}

<form on:submit|preventDefault={addChoice}>
	<input aria-label="choice" type="text" bind:value={nextChoice} required />
	<button aria-label="add choice">Add</button>
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
