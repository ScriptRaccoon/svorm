<script lang="ts">
	import { goto } from "$app/navigation";
	import Loader from "@/lib/Loader.svelte";
	import { onMount } from "svelte";
	import Element from "./Element.svelte";
	import Menu from "./Menu.svelte";

	let title: string = "";

	let elements: element[] = [];

	let error_message = "";

	let title_input: HTMLInputElement;

	let loading = false;

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

	async function create_svorm(): Promise<void> {
		loading = true;
		error_message = "";

		const valid = validate();

		if (!valid) {
			loading = false;
			error_message = "Please fill in all required fields";
			return;
		}

		const response = await fetch("/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, elements })
		});

		loading = false;

		if (!response.ok) {
			error_message = "Svorm could not be created";
			return;
		}

		const data = await response.json();
		const id = data.id as string;

		goto(`created/${id}`);
	}

	function delete_element(element: element): void {
		elements = elements.filter((_element) => _element != element);
	}

	onMount(() => {
		title_input?.focus();
	});

	function validate(): boolean {
		return (
			title.length > 0 &&
			elements.every((e) => {
				if ("choices" in e) {
					return e.question.length > 0 && e.choices.length > 0;
				} else {
					return e.question.length > 0;
				}
			})
		);
	}
</script>

<h2>Create a svorm</h2>

<label for="title">Title</label>
<input type="text" bind:value={title} bind:this={title_input} />

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
	on:finish={create_svorm}
/>

{#if loading}
	<Loader />
{/if}

{#if error_message}
	<p class="error">
		{error_message}
	</p>
{/if}

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
