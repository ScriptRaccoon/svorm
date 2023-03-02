import { supabase } from "./supabase";

export async function save_questions(
	questions: question[],
	svorm_id: string
): Promise<boolean> {
	const questions_enriched = questions.map((q, index) => {
		return { ...q, index, svorm_id };
	});

	const { error } = await supabase
		.from("questions")
		.insert(questions_enriched)
		.select();

	if (error) {
		console.log({ error });
		return false;
	}

	return true;
}

export async function get_questions(
	svorm_id: string
): Promise<question_db[] | null> {
	const { data, error } = await supabase
		.from("questions")
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
		.from("multiple_choices")
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
