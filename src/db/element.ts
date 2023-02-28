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
