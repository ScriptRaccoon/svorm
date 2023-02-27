import { supabase } from "./supabase";

export async function save_svorm_to_database(svorm: svorm) {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: svorm.title, elements: svorm.elements }])
		.select();
	return { data, error };
}
