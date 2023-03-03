import { supabase } from "./supabase";

export async function save_questions(
	questions: question[],
	svorm_id: number
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
	svorm_id: number
): Promise<question_db[] | null> {
	const { data, error } = await supabase
		.from("questions")
		.select()
		.eq("svorm_id", svorm_id);

	if (error || !data) {
		console.log({ error });
		return null;
	}

	const questions = data.sort(
		(a, b) => a.index - b.index
	) as question_db[];

	return questions;
}
