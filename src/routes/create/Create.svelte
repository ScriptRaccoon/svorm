<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import Question from "./Question.svelte";
	import Menu from "./Menu.svelte";
	import { ERROR, HEADINGS, LABELS } from "@/config";

	let title: string = "";
	let questions: question[] = [];
	let error_message = "";
	let title_input: HTMLInputElement;
	let loading = false;

	function add_simple_question(): void {
		error_message = "";
		const question: simple_question = {
			required: false,
			question: ""
		};
		questions = [...questions, question];
	}

	function add_multiple_choice(): void {
		error_message = "";
		const question: multiple_choice = {
			required: false,
			question: "",
			choices: []
		};
		questions = [...questions, question];
	}

	async function create_svorm(): Promise<void> {
		loading = true;
		error_message = "";

		const valid = validate_questions();

		if (!valid) {
			loading = false;
			return;
		}

		const svorm: svorm = { title, questions };

		const response = await fetch("/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(svorm)
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

	function delete_question(q: question): void {
		questions = questions.filter((_q) => _q != q);
	}

	function validate_questions(): boolean {
		if (title.length === 0) {
			error_message = ERROR.NO_TITLE;
			return false;
		}

		if (questions.length === 0) {
			error_message = ERROR.NO_QUESTION;
			return false;
		}

		if (questions.some((q) => q.question.length == 0)) {
			error_message = ERROR.NOT_FILLED;
			return false;
		}

		if (
			questions.some((q) => "choices" in q && q.choices.length <= 1)
		) {
			error_message = ERROR.NO_CHOICE;
			return false;
		}

		return true;
	}

	onMount(() => {
		title_input?.focus();
	});
</script>

<h2>{HEADINGS.CREATE}</h2>

<label>
	{LABELS.TITLE}
	<input type="text" bind:value={title} bind:this={title_input} />
</label>

{#if questions.length > 0}
	<ul class="questions">
		{#each questions as question}
			<li>
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
	on:finish={create_svorm}
/>

<Loader {loading} />

<Error {error_message} />

<style>
	.questions {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 2rem;
	}
</style>
