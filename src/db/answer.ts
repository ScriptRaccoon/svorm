import { supabase } from "./supabase";

export async function save_submission(
	submission: submission
): Promise<boolean> {
	const saved_questions = Object.entries(submission.answers_questions)
		.map(([question_id, answer]) => ({
			question_id,
			answer
		}))
		.filter((q) => q.answer.length > 0);

	const { error: question_error } = await supabase
		.from("questions_answers")
		.insert(saved_questions);
	if (question_error) {
		console.log({ question_error });
		return false;
	}

	const saved_multiple_choices = Object.entries(
		submission.answers_multiple_choices
	)
		.map(([multiple_choice_id, answer]) => ({
			multiple_choice_id,
			answer
		}))
		.filter((m) => m.answer !== null);

	const { error: multiple_choice_error } = await supabase
		.from("multiple_choices_answers")
		.insert(saved_multiple_choices);
	if (multiple_choice_error) {
		console.log({ multiple_choice_error });
		return false;
	}

	return true;
}
