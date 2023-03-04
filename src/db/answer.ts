import { supabase } from "./supabase";

export async function save_answers(
	answers: answers
): Promise<boolean> {
	const { error: error1 } = await supabase
		.from("simple_questions_answers")
		.insert(answers.simple_questions_answers);

	if (error1) {
		console.log({ error: error1 });
		return false;
	}

	const { error: error2 } = await supabase
		.from("multiple_choices_answers")
		.insert(answers.multiple_choices_answers);

	if (error2) {
		console.log({ error: error1 });
		return false;
	}

	return true;
}
