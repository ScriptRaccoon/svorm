import { supabase } from "./supabase";

export async function save_svorm_title(title: string) {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: title }])
		.select();
	return { data, error };
}

export async function get_svorm(id: string) {
	const { data, error } = await supabase
		.from("svorm")
		.select()
		.eq("id", id);
	return { data, error };
}
