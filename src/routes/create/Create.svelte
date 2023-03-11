<script lang="ts">
	import { goto } from "$app/navigation";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import Question from "./Question.svelte";
	import Menu from "./Menu.svelte";
	import { ERROR, HEADINGS, LABELS } from "@/config";
	import { fade } from "svelte/transition";
	import Asterisk from "@/lib/Asterisk.svelte";
	import Required from "@/lib/Required.svelte";

	let title: string = "";
	let questions: question[] = [];

	let error_message = "";
	let title_input: HTMLInputElement;
	let loading = false;

	function add_simple_question(): void {
		error_message = "";
		const question: simple_question = {
			required: false,
			question: "",
			client_id: crypto.randomUUID()
		};
		questions = [...questions, question];
	}

	function add_multiple_choice(): void {
		error_message = "";
		const question: multiple_choice = {
			required: false,
			question: "",
			choices: [],
			client_id: crypto.randomUUID()
		};
		questions = [...questions, question];
	}

	async function create_svorm(): Promise<void> {
		loading = true;
		error_message = "";

		const valid = validate_svorm();

		if (!valid) {
			loading = false;
			return;
		}

		const response = await fetch("/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, questions })
		});

		loading = false;

		if (!response.ok) {
			error_message = ERROR.NO_SVORM;
			return;
		}

		const data = await response.json();

		const { id } = data;

		if (!id) {
			error_message = ERROR.NO_SVORM;
			return;
		}

		goto(`created/${id}`);
	}

	function delete_question(selected_question: question): void {
		questions = questions.filter(
			(question) => question != selected_question
		);
	}

	function validate_svorm(): boolean {
		if (title.length === 0) {
			error_message = ERROR.NO_TITLE;
			return false;
		}

		if (questions.length === 0) {
			error_message = ERROR.NO_QUESTION;
			return false;
		}

		if (questions.some((question) => question.question.length == 0)) {
			error_message = ERROR.NOT_FILLED;
			return false;
		}

		if (
			questions.some(
				(question) =>
					"choices" in question && question.choices.length <= 1
			)
		) {
			error_message = ERROR.NO_CHOICE;
			return false;
		}

		return true;
	}
</script>

<h2>{HEADINGS.CREATE}</h2>

<Required noun="Fields" />

<label>
	{LABELS.TITLE}<Asterisk />
	<input type="text" bind:value={title} bind:this={title_input} />
</label>

{#if questions.length > 0}
	<ul class="cards">
		{#each questions as question (question.client_id)}
			<li transition:fade|local>
				<Question
					bind:question
					on:delete={() => delete_question(question)}
				/>
			</li>
		{/each}
	</ul>
{/if}

<Menu
	on:choice={add_multiple_choice}
	on:question={add_simple_question}
	on:create={create_svorm}
/>

<Loader {loading} />

<Error {error_message} />
