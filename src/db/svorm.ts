import { supabase } from "./supabase";

export async function save_svorm(
	svorm: svorm
): Promise<number | null> {
	const { data, error } = await supabase
		.from("svorms")
		.insert({ title: svorm.title })
		.select();
	if (error) {
		console.log({ error });
		return null;
	}
	if (!data || data.length == 0) {
		return null;
	}
	const { id } = data[0];
	return id;
}

export async function get_svorm(
	id: number
): Promise<svorm_db | null> {
	const { data, error } = await supabase
		.from("svorms")
		.select()
		.eq("id", id);
	if (error) {
		console.log({ error });
		return null;
	}
	if (!data || data.length == 0) {
		return null;
	}
	const svorm = data[0];
	return svorm;
}
