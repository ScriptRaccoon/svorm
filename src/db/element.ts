import { supabase } from "./supabase";

export async function save_element(
	element: element,
	svorm_id: string,
	index: number
) {
	const table = "choices" in element ? "multiple_choice" : "question";
	const { data, error } = await supabase
		.from(table)
		.insert([{ ...element, svorm_id, index }])
		.select();
	return { data, error };
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
