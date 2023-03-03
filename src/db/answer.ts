import { supabase } from "./supabase";

export async function save_answers(
	answers: answers
): Promise<boolean> {
	const all_answers = [
		...answers.answers_simple_questions,
		...answers.choices_multiple_choices
	];
	const { error } = await supabase
		.from("answers")
		.insert(all_answers);

	if (error) {
		console.log({ error });
		return false;
	}

	return true;
}
