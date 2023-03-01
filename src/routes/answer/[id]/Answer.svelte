<script lang="ts">
	import { goto } from "$app/navigation";
	import MultipleChoiceAnswer from "./MultipleChoiceAnswer.svelte";
	import QuestionAnswer from "./QuestionAnswer.svelte";

	export let svorm: svorm_db;
	export let elements: element_db[];
	let error_message = "";

	const questions = elements.filter(
		(element) => !("choices" in element)
	);

	const multiple_choices = elements.filter(
		(element) => "choices" in element
	);

	const answers_questions = Object.fromEntries(
		questions.map((q) => [q.id, ""])
	);

	const answers_multiple_choices = Object.fromEntries(
		multiple_choices.map((m) => [m.id, null])
	);

	const submission: submission = {
		answers_questions,
		answers_multiple_choices
	};

	async function submit_answers() {
		error_message = "";
		const valid = validate_submission();
		if (!valid) {
			error_message = "Please fill in all required fields";
			return;
		}
		const response = await fetch("/answer", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(submission)
		});
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
						answers_questions[question.id].length == 0
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

<ul class="elements">
	{#each elements as element, index}
		<li>
			<div class="element">
				{#if "choices" in element}
					<MultipleChoiceAnswer
						bind:element
						bind:answer={answers_multiple_choices[element.id]}
					/>
				{:else}
					<QuestionAnswer
						bind:element
						bind:answer={answers_questions[element.id]}
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
