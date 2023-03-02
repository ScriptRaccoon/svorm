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

	const answers_simple_questions = Object.fromEntries(
		simple_questions.map((q) => [q.id, ""])
	);

	const answers_multiple_choices = Object.fromEntries(
		multiple_choices.map((m) => [m.id, null])
	);

	const submission: submission = {
		answers_simple_questions,
		answers_multiple_choices
	};

	async function submit_answers() {
		loading = true;
		error_message = "";
		const valid = validate_submission();
		if (!valid) {
			loading = false;
			error_message = "Please fill in all required fields";
			return;
		}
		const response = await fetch("/answer", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(submission)
		});
		loading = false;
		if (response.ok) {
			goto("/answered");
		} else {
			error_message = "Svorm could not be submitted";
		}
	}

	function validate_submission(): boolean {
		return (
			questions.every(
				(question) =>
					!(
						question.required &&
						answers_simple_questions[question.id].length == 0
					)
			) &&
			multiple_choices.every(
				(multiple_choice) =>
					!(
						multiple_choice.required &&
						answers_multiple_choices[multiple_choice.id] === null
					)
			)
		);
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
						bind:answer={answers_multiple_choices[question.id]}
					/>
				{:else if question.type === "simple_question"}
					<SimpleAnswer
						bind:question
						bind:answer={answers_simple_questions[question.id]}
					/>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<p id="required">
	<sup aria-hidden="true">*</sup>required
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

	sup {
		color: var(--danger-color);
	}

	menu {
		padding-block: 1rem;
		text-align: center;
	}
</style>
