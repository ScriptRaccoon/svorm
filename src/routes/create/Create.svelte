<script lang="ts">
	import { goto } from "$app/navigation";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import { onMount } from "svelte";
	import Question from "./Question.svelte";
	import Menu from "./Menu.svelte";

	let title: string = "";
	let questions: question[] = [];
	let error_message = "";
	let title_input: HTMLInputElement;
	let loading = false;

	function add_simple_question(): void {
		error_message = "";
		const q: simple_question = {
			type: "simple_question",
			required: false,
			question: ""
		};
		questions = [...questions, q];
	}

	function add_multiple_choice(): void {
		error_message = "";
		const m: multiple_choice = {
			type: "multiple_choice",
			required: false,
			question: "",
			choices: []
		};
		questions = [...questions, m];
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
			body: JSON.stringify({ title, questions })
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

	function delete_question(q: question): void {
		questions = questions.filter((_q) => _q != q);
	}

	onMount(() => {
		title_input?.focus();
	});

	function validate(): boolean {
		return (
			title.length > 0 &&
			questions.length > 0 &&
			questions.every((e) => {
				if (e.type === "multiple_choice") {
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

{#if questions.length > 0}
	<ul class="elements">
		{#each questions as element, index}
			<li>
				<Question
					bind:question={element}
					{index}
					on:delete={() => delete_question(element)}
				/>
			</li>
		{/each}
	</ul>
{/if}

<Menu
	on:choice={add_multiple_choice}
	on:question={add_simple_question}
	on:finish={create_svorm}
/>

<Loader {loading} />

<Error {error_message} />

<style>
	.elements {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
