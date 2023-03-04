<script lang="ts">
	import { goto } from "$app/navigation";
	import Error from "@/lib/Error.svelte";
	import Loader from "@/lib/Loader.svelte";
	import MultipleChoiceAnswer from "./MultipleChoiceAnswer.svelte";
	import SimpleAnswer from "././SimpleAnswer.svelte";
	import { ERROR, LABELS, TEXT } from "@/config";

	export let svorm: svorm_db;
	export let questions: question_db[];

	let loading = false;
	let error_message = "";

	const questions_with_answers: question_answer[] = questions.map(
		(q) => {
			if ("choices" in q) {
				return { ...q, choice: null };
			} else {
				return { ...q, answer: "" };
			}
		}
	);

	async function submit_answers() {
		loading = true;
		error_message = "";

		if (!answers_are_valid()) return;

		const answers = filtered_answers();

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

	function filtered_answers(): answer[] {
		return questions_with_answers
			.filter((q) => {
				if ("choices" in q) {
					return q.choice !== null;
				} else {
					return q.answer.length > 0;
				}
			})
			.map((q) => {
				if ("choices" in q) {
					return {
						question_id: q.id,
						choice: q.choice
					};
				} else {
					return {
						question_id: q.id,
						answer: q.answer
					};
				}
			});
	}

	function answers_are_valid(): boolean {
		const valid = questions_with_answers.every((q) => {
			if ("choices" in q) {
				return !(q.required && q.choice === null);
			} else {
				return !(q.required && q.answer.length === 0);
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
	<ul class="questions" style="padding-block:1rem;">
		{#each questions_with_answers as question}
			<li>
				<div class="question">
					<h3 aria-describedby="required">
						{question.question}{#if question.required}
							<span class="danger" aria-hidden="true">*</span>
						{/if}
					</h3>
					{#if "choices" in question}
						<MultipleChoiceAnswer bind:question />
					{:else}
						<SimpleAnswer bind:question />
					{/if}
				</div>
			</li>
		{/each}
	</ul>

	<p id="required">
		<span class="danger" aria-hidden="true">*</span
		>{TEXT.REQUIRED.toLowerCase()}
	</p>

	<menu>
		<button type="submit">{LABELS.SUBMIT_ANSWERS}</button>
	</menu>
</form>

<Loader {loading} />

<Error {error_message} />

<style>
	menu {
		padding-block: 1rem;
		text-align: center;
	}
</style>
