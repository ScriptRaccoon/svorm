import { supabase } from "./supabase";

export async function addSvormToDatabase(svorm: svorm) {
	const { data, error } = await supabase
		.from("svorm")
		.insert([{ title: svorm.title, elements: svorm.elements }])
		.select();
	return { data, error };
}
