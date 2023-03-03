import { supabase } from "./supabase";

export async function save_answers(
	answers: answer[]
): Promise<boolean> {
	const simple_questions_answers = [];
	const multiple_choices_answers = [];

	for (let i = 0; i < answers.length; i++) {
		const answer = answers[i];
		if ("answer" in answer) {
			simple_questions_answers.push(answer);
		} else {
			multiple_choices_answers.push(answer);
		}
	}

	const { error: error1 } = await supabase
		.from("simple_questions_answers")
		.insert(simple_questions_answers);

	if (error1) {
		console.log({ error: error1 });
		return false;
	}

	const { error: error2 } = await supabase
		.from("multiple_choices_answers")
		.insert(multiple_choices_answers);

	if (error2) {
		console.log({ error: error1 });
		return false;
	}

	return true;
}
