import { supabase } from "./supabase";

export async function save_elements(
	elements: element[],
	svorm_id: string
): Promise<boolean> {
	const questions: (question & element_save)[] = [];
	const multiple_choices: (multiple_choice & element_save)[] = [];

	for (let index = 0; index < elements.length; index++) {
		const element = elements[index];
		if ("choices" in element) {
			const multiple_choice = { ...element, svorm_id, index };
			multiple_choices.push(multiple_choice);
		} else {
			const question = { ...element, svorm_id, index };
			questions.push(question);
		}
	}

	const { error: question_error } = await supabase
		.from("question")
		.insert(questions)
		.select();
	if (question_error) {
		console.log({ question_error });
		return false;
	}

	const { error: multiple_choice_error } = await supabase
		.from("multiple_choice")
		.insert(multiple_choices);
	if (multiple_choice_error) {
		console.log({ multiple_choice_error });
		return false;
	}
	return true;
}

export async function get_questions(
	svorm_id: string
): Promise<question_db[] | null> {
	const { data, error } = await supabase
		.from("question")
		.select()
		.eq("svorm_id", svorm_id);
	if (error || !data) {
		console.log({ error });
		return null;
	}
	return data as question_db[];
}

export async function get_multiple_choices(
	svorm_id: string
): Promise<multiple_choice_db[] | null> {
	const { data, error } = await supabase
		.from("multiple_choice")
		.select()
		.eq("svorm_id", svorm_id);
	if (error || !data) {
		console.log({ error });
		return null;
	}
	return data as multiple_choice_db[];
}

export async function get_elements(
	svorm_id: string
): Promise<element_db[] | null> {
	const questions = await get_questions(svorm_id);
	const multiple_choices = await get_multiple_choices(svorm_id);
	if (!questions || !multiple_choices) return null;
	const elements: element_db[] = questions.concat(multiple_choices);
	const sorted_elements = elements.sort((e, f) => e.index - f.index);
	return sorted_elements;
}
