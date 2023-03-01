<script lang="ts">
	import { goto } from "$app/navigation";
	import Element from "./Element.svelte";
	import Menu from "./Menu.svelte";

	let title: string = "";

	let elements: element[] = [];

	function add_question(): void {
		const question: question = {
			required: false,
			question: ""
		};
		elements = [...elements, question];
	}

	function add_multiple_choice(): void {
		const multiple_choice: multiple_choice = {
			required: false,
			question: "",
			choices: []
		};
		elements = [...elements, multiple_choice];
	}

	async function createSvorm(): Promise<void> {
		try {
			const response = await fetch("/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, elements })
			});
			if (!response.ok) {
				throw response.status + " Error: Svorm could not be created";
			}
			const data = await response.json();
			const id = data.id as string;

			if (!id) throw "Error: Svorm has unknown ID";

			goto(`created/${id}`);
		} catch (errorMessage) {
			window.alert(errorMessage);
		}
	}

	function delete_element(element: element): void {
		elements = elements.filter((_element) => _element != element);
	}
</script>

<h2>Create a svorm</h2>

<label for="title">Title</label>
<input type="text" bind:value={title} />

{#if elements.length > 0}
	<ul class="elements">
		{#each elements as element, index}
			<li>
				<Element
					bind:element
					{index}
					on:delete={() => delete_element(element)}
				/>
			</li>
		{/each}
	</ul>
{/if}

<Menu
	on:choice={add_multiple_choice}
	on:question={add_question}
	on:finish={createSvorm}
/>

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
