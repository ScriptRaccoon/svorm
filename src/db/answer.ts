import { supabase } from "./supabase";

export async function save_answers(
	answers: answer[]
): Promise<boolean> {
	const { error } = await supabase.from("answers").insert(answers);

	if (error) {
		console.log({ error });
		return false;
	}

	return true;
}
