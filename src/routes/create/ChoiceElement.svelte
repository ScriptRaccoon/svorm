<script lang="ts">
	export let data: choiceElement;
	let nextChoice: string = "";
	function addChoice(): void {
		data.choices = [...data.choices, nextChoice];
		nextChoice = "";
	}

	function deleteChoice(index: number): void {
		data.choices.splice(index, 1);
		data.choices = data.choices;
	}
</script>

<h3>Choice element</h3>
<p>
	<label for="question + {data.id}">Prompt</label>
	<input type="text" id="question + {data.id}" bind:value={data.prompt} />
</p>

{#each data.choices as choice, index}
	<p>{choice} <button type="button" on:click={() => deleteChoice(index)}>delete</button></p>
{/each}

<form on:submit|preventDefault={addChoice}>
	<input type="text" bind:value={nextChoice} required />
	<button>Add choice</button>
</form>
