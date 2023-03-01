import { supabase } from "./supabase";

export async function save_svorm(
	svorm: svorm
): Promise<string | null> {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: svorm.title }])
		.select();
	if (error || !data || data.length == 0) {
		console.log(error);
		return null;
	}
	return data[0].id;
}

export async function get_svorm(
	id: string
): Promise<svorm_db | null> {
	const { data, error } = await supabase
		.from("svorm")
		.select()
		.eq("id", id);
	if (error || !data || data.length == 0) {
		console.log(error);
		return null;
	}
	const svorm = data[0] as svorm_db;
	return svorm;
}
