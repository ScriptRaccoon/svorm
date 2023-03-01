import { supabase } from "./supabase";

export async function save_elements(
	elements: element[],
	svorm_id: string
) {
	const questions: Omit<question_db, "id">[] = [];
	const multiple_choices: Omit<multiple_choice_db, "id">[] = [];

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

	await supabase.from("question").insert(questions);
	await supabase.from("multiple_choice").insert(multiple_choices);
}

export async function get_questions(svorm_id: string) {
	const { data, error } = await supabase
		.from("question")
		.select()
		.eq("svorm_id", svorm_id);
	return { data, error };
}

export async function get_multiple_choices(svorm_id: string) {
	const { data, error } = await supabase
		.from("multiple_choice")
		.select()
		.eq("svorm_id", svorm_id);
	return { data, error };
}

export async function get_elements(svorm_id: string) {
	const questions = (await get_questions(svorm_id))
		.data as question_db[];
	const multiple_choices = (await get_multiple_choices(svorm_id))
		.data as multiple_choice_db[];
	const elements: element_db[] = [...questions, ...multiple_choices];
	const sorted_elements = elements.sort((e, f) => e.index - f.index);
	return sorted_elements;
}
