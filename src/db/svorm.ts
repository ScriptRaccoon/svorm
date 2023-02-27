import { supabase } from "./supabase";

export async function save_svorm_title(title: string) {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: title }])
		.select();
	return { data, error };
}
