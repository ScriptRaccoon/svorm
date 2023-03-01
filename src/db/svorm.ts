import { supabase } from "./supabase";

export async function save_svorm_title(
	title: string
): Promise<string | null> {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: title }])
		.select();
	if (error || !data || data.length == 0) {
		console.log(error);
		return null;
	}
	return data[0].id;
}

export async function get_svorm(id: string) {
	const { data, error } = await supabase
		.from("svorm")
		.select()
		.eq("id", id);
	return { data, error };
}
