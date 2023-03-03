<script lang="ts">
	import { goto } from "$app/navigation";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import MultipleChoiceAnswer from "./MultipleChoiceAnswer.svelte";
	import SimpleAnswer from "././SimpleAnswer.svelte";

	export let svorm: svorm_db;
	export let questions: question_db[];

	let loading = false;
	let error_message = "";

	const simple_questions = questions.filter(
		(q) => q.type === "simple_question"
	);

	const multiple_choices = questions.filter(
		(q) => q.type === "multiple_choice"
	);

	const answers_simple_questions_by_id = Object.fromEntries(
		simple_questions.map((q) => [q.id, ""])
	);

	const choices_multiple_choices_by_id = Object.fromEntries(
		multiple_choices.map((m) => [m.id, null])
	);

	function compute_answers(): answers {
		const answers_simple_questions = Object.entries(
			answers_simple_questions_by_id
		)
			.map(([question_id, answer]) => ({ question_id, answer }))
			.filter((q) => q.answer.length > 0);

		const choices_multiple_choices = Object.entries(
			choices_multiple_choices_by_id
		)
			.map(([question_id, choice]) => ({ question_id, choice }))
			.filter((m) => m.choice !== null);

		const answers = {
			answers_simple_questions,
			choices_multiple_choices
		};

		return answers;
	}

	async function submit_answers() {
		loading = true;
		error_message = "";

		if (!answers_are_valid()) return;

		const answers = compute_answers();

		const response = await fetch("/answer", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(answers)
		});

		loading = false;

		if (response.ok) {
			goto("/answered");
		} else {
			error_message = "Answers could not be submitted";
		}
	}

	function answers_are_valid(): boolean {
		const questions_are_valid = questions.every(
			(question) =>
				!(
					question.required &&
					answers_simple_questions_by_id[question.id].length == 0
				)
		);

		const multiple_choices_are_valid = multiple_choices.every(
			(multiple_choice) =>
				!(
					multiple_choice.required &&
					choices_multiple_choices_by_id[multiple_choice.id] === null
				)
		);

		const valid = questions_are_valid && multiple_choices_are_valid;

		if (!valid) {
			loading = false;
			error_message = "Please fill in all required fields";
		}
		return valid;
	}
</script>

<h2>
	{svorm.title}
</h2>

<ul class="questions">
	{#each questions as question}
		<li>
			<div class="element">
				{#if question.type === "multiple_choice"}
					<MultipleChoiceAnswer
						bind:question
						bind:choice={choices_multiple_choices_by_id[question.id]}
					/>
				{:else if question.type === "simple_question"}
					<SimpleAnswer
						bind:question
						bind:answer={answers_simple_questions_by_id[question.id]}
					/>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<p id="required">
	<span class="danger" aria-hidden="true">*</span>required
</p>

<menu>
	<button on:click={submit_answers}>Submit your answers</button>
</menu>

<Loader {loading} />

<Error {error_message} />

<style>
	.questions {
		list-style-type: none;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		padding-block: 1rem;
	}

	.element {
		background-color: var(--light-color);
		padding: 1rem;
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	menu {
		padding-block: 1rem;
		text-align: center;
	}
</style>
