import { get_svorm } from "./svorm";
import { get_questions } from "./question";
import { supabase } from "./supabase";

export async function get_result(
	svorm_id: number
): Promise<svorm_result | null> {
	const svorm = await get_svorm(svorm_id);

	if (!svorm) {
		return null;
	}

	const questions = await get_questions(svorm_id);

	if (!questions) {
		return null;
	}

	const simple_questions_results: simple_question_result[] = [];
	const multiple_choices_results: multiple_choice_result[] = [];

	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];

		if ("choices" in question) {
			const result = await get_multiple_choice_result(question.id);
			if (!result) {
				return null;
			}
			multiple_choices_results.push({
				question_id: question.id,
				result
			});
		} else {
			const result = await get_simple_question_result(question.id);
			if (!result) {
				return null;
			}
			simple_questions_results.push({
				question_id: question.id,
				result
			});
		}
	}

	return {
		svorm,
		questions,
		simple_questions_results,
		multiple_choices_results
	};
}

async function get_simple_question_result(
	question_id: number
): Promise<null | string[]> {
	const { data, error } = await supabase
		.from("simple_questions_answers")
		.select()
		.eq("question_id", question_id);

	if (error) {
		console.log(error);
		return null;
	}

	if (!data) {
		return null;
	}

	const answers = data.map((question) => question.answer);

	return answers;
}

async function get_multiple_choice_result(
	question_id: number
): Promise<null | number[]> {
	const { data, error } = await supabase
		.from("multiple_choices_answers")
		.select()
		.eq("question_id", question_id);

	if (error) {
		console.log(error);
		return null;
	}

	if (!data) {
		return null;
	}

	const choices = data.map((question) => question.choice);

	return choices;
}
