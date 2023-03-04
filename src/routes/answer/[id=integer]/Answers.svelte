<script lang="ts">
	import { goto } from "$app/navigation";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import { ERROR, LABELS, TEXT } from "@/config";
	import MultipleChoiceAnswer from "./MultipleChoiceAnswer.svelte";
	import SimpleAnswer from "./SimpleAnswer.svelte";

	export let svorm: svorm_db;
	export let questions: question_db[];

	let answers_object: Record<string, string> = {};
	let choices_object: Record<string, number> = {};

	let loading = false;
	let error_message = "";

	async function submit_answers() {
		loading = true;
		error_message = "";

		if (!answers_are_valid()) return;

		const simple_questions_answers: simple_question_answer[] =
			Object.entries(answers_object)
				.map(([id_string, answer]) => ({
					question_id: parseInt(id_string),
					answer
				}))
				.filter((a) => a.answer.length > 0);

		const multiple_choices_answers: multiple_choice_answer[] =
			Object.entries(choices_object).map(([id_string, choice]) => ({
				question_id: parseInt(id_string),
				choice
			}));

		const answers: answers = {
			simple_questions_answers,
			multiple_choices_answers
		};

		const response = await fetch("/answer", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(answers)
		});

		loading = false;

		if (response.ok) {
			goto("/answered");
		} else {
			error_message = ERROR.NO_ANSWERS;
		}
	}

	function answers_are_valid(): boolean {
		const valid = questions.every((question) => {
			if ("choices" in question) {
				return (
					!question.required ||
					choices_object[question.id] !== undefined
				);
			} else {
				return (
					!question.required ||
					answers_object[question.id]?.length > 0
				);
			}
		});

		if (!valid) {
			loading = false;
			error_message = ERROR.NOT_FILLED_REQUIRED;
		}

		return valid;
	}
</script>

<h2>
	{svorm.title}
</h2>

<form on:submit|preventDefault={submit_answers}>
	<ul class="cards">
		{#each questions as question}
			<li>
				<div class="card">
					<h3 aria-describedby="required">
						{question.question}{#if question.required}
							<span class="danger" aria-hidden="true">*</span>
						{/if}
					</h3>
					{#if "choices" in question}
						<MultipleChoiceAnswer {question} bind:choices_object />
					{:else}
						<SimpleAnswer {question} bind:answers_object />
					{/if}
				</div>
			</li>
		{/each}
	</ul>

	<p id="required">
		<span class="danger" aria-hidden="true">*</span
		>{TEXT.REQUIRED.toLowerCase()}
	</p>

	<menu class="small-menu">
		<button type="submit">{LABELS.SUBMIT_ANSWERS}</button>
	</menu>
</form>

<Loader {loading} />

<Error {error_message} />
