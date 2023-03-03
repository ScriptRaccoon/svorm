import { supabase } from "./supabase";

export async function save_questions(
	questions: question[],
	svorm_id: number
): Promise<boolean> {
	const simple_questions = [];
	const multiple_choices = [];

	for (let index = 0; index < questions.length; index++) {
		const question = questions[index];
		if ("choices" in question) {
			multiple_choices.push({ ...question, index, svorm_id });
		} else {
			simple_questions.push({ ...question, index, svorm_id });
		}
	}

	let { error: error_1 } = await supabase
		.from("simple_questions")
		.insert(simple_questions)
		.select();

	if (error_1) {
		console.log({ error: error_1 });
		return false;
	}

	let { error: error_2 } = await supabase
		.from("multiple_choices")
		.insert(multiple_choices)
		.select();

	if (error_2) {
		console.log({ error: error_2 });
		return false;
	}

	return true;
}

export async function get_questions(
	svorm_id: number
): Promise<question_db[] | null> {
	const { data: simple_questions, error: error1 } = await supabase
		.from("simple_questions")
		.select()
		.eq("svorm_id", svorm_id);

	if (error1) {
		console.log({ error: error1 });
		return null;
	}

	if (!simple_questions) {
		return null;
	}

	const { data: multiple_choices, error: error2 } = await supabase
		.from("multiple_choices")
		.select()
		.eq("svorm_id", svorm_id);

	if (error2) {
		console.log({ error: error2 });
		return null;
	}

	if (!multiple_choices) {
		return null;
	}

	const questions = simple_questions.concat(multiple_choices);

	const sorted_questions = questions.sort(
		(p, q) => p.index - q.index
	);

	return sorted_questions;
}
