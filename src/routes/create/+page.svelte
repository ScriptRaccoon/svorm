<script lang="ts">
	import { goto } from "$app/navigation";
	import FormElement from "./FormElement.svelte";
	import Menu from "./Menu.svelte";

	let formElements: formElement[] = [];

	function addQuestionElement(): void {
		const question: questionElement = {
			required: false,
			id: crypto.randomUUID(),
			question: ""
		};
		formElements = [...formElements, question];
	}

	function addChoiceElement(): void {
		const choice: choiceElement = {
			required: false,
			id: crypto.randomUUID(),
			prompt: "",
			choices: []
		};
		formElements = [...formElements, choice];
	}

	async function createForm(): Promise<void> {
		try {
			const response = await fetch("/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formElements)
			});
			if (!response.ok) {
				throw response.status + " error: svorm could not be created";
			}
			const data = await response.json();
			const id = data.id;

			if (!id) throw "error: svorm has unknown ID";

			goto("created/" + id);
		} catch (errorMessage) {
			window.alert(errorMessage);
		}
	}

	function deleteElement(id: string): void {
		formElements = formElements.filter((data) => data.id != id);
	}
</script>

<h2>Create a svorm</h2>

<Menu on:choice={addChoiceElement} on:question={addQuestionElement} on:finish={createForm} />

<div class="elements">
	{#each formElements as data}
		<FormElement bind:data on:delete={() => deleteElement(data.id)} />
	{/each}
</div>

<style>
	.elements {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
