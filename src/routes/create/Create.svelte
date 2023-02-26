<script lang="ts">
	import { goto } from "$app/navigation";
	import SvormElement from "./Element.svelte";
	import Menu from "./Menu.svelte";

	let title: string = "";

	let elements: element[] = [];

	function addQuestion(): void {
		const question: question = {
			required: false,
			id: crypto.randomUUID(),
			question: ""
		};
		elements = [...elements, question];
	}

	function addMultipleChoice(): void {
		const multipleChoice: multipleChoice = {
			required: false,
			id: crypto.randomUUID(),
			question: "",
			choices: []
		};
		elements = [...elements, multipleChoice];
	}

	async function createSvorm(): Promise<void> {
		try {
			const response = await fetch("/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ title, elements })
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
		elements = elements.filter((data) => data.id != id);
	}
</script>

<h2>Create a svorm</h2>

<label for="title">Title</label>
<input type="text" bind:value={title} />

{#if elements.length > 0}
	<ul class="elements">
		{#each elements as element}
			<li>
				<SvormElement bind:element on:delete={() => deleteElement(element.id)} />
			</li>
		{/each}
	</ul>
{/if}

<Menu on:choice={addMultipleChoice} on:question={addQuestion} on:finish={createSvorm} />

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
