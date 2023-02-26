<script lang="ts">
	import { goto } from "$app/navigation";
	import SvormElement from "./SvormElement.svelte";
	import Menu from "./Menu.svelte";

	let title: string = "";

	let svormElements: svormElement[] = [];

	function addQuestionElement(): void {
		const question: questionElement = {
			required: false,
			id: crypto.randomUUID(),
			question: ""
		};
		svormElements = [...svormElements, question];
	}

	function addChoiceElement(): void {
		const choice: choiceElement = {
			required: false,
			id: crypto.randomUUID(),
			prompt: "",
			choices: []
		};
		svormElements = [...svormElements, choice];
	}

	async function createSvorm(): Promise<void> {
		try {
			const response = await fetch("/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ title, svormElements })
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
		svormElements = svormElements.filter((data) => data.id != id);
	}
</script>

<h2>Create a svorm</h2>

<label for="title">Title</label>
<input type="text" bind:value={title} />

{#if svormElements.length > 0}
	<ul class="elements">
		{#each svormElements as data}
			<li>
				<SvormElement bind:data on:delete={() => deleteElement(data.id)} />
			</li>
		{/each}
	</ul>
{/if}

<Menu on:choice={addChoiceElement} on:question={addQuestionElement} on:finish={createSvorm} />

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
