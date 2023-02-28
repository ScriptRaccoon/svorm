import { supabase } from "./supabase";

export async function save_element(
	q: element_create,
	svorm_id: string,
	index: number
) {
	const table = "choices" in q ? "multiple_choice" : "question";
	const { data, error } = await supabase
		.from(table)
		.insert([{ ...q, svorm_id, index }])
		.select();
	return { data, error };
}
