import { get_svorm } from "./svorm";
import { get_questions } from "./question";
import { supabase } from "./supabase";

export async function get_results(
	svorm_id: number
): Promise<null | svorm_results> {
	const svorm = await get_svorm(svorm_id);

	if (!svorm) {
		return null;
	}

	const questions = await get_questions(svorm_id);

	if (!questions) {
		return null;
	}

	const questions_with_results: question_results[] = [];

	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];

		if ("choices" in question) {
			const results = await get_multiple_choices_answers(question.id);
			if (!results) {
				return null;
			}
			questions_with_results.push({ ...question, results });
		} else {
			const results = await get_simple_questions_answers(question.id);
			if (!results) {
				return null;
			}
			questions_with_results.push({ ...question, results });
		}
	}

	const svorm_with_results: svorm_results = {
		...svorm,
		results: questions_with_results
	};

	return svorm_with_results;
}

async function get_simple_questions_answers(
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

	const answers = data.map((q) => q.answer);

	return answers;
}

async function get_multiple_choices_answers(
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

	const choices = data.map((q) => q.choice);

	return choices;
}
