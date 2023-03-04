import { supabase } from "./supabase";
import {
	delete_simple_question,
	get_questions,
	delete_multiple_choice
} from "./question";

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

async function get_old_svorms(): Promise<svorm_db[] | null> {
	const time_now = new Date().getTime();
	const one_month_ago = new Date(
		time_now - 1000 * 60 * 60 * 24 * 30
	).toISOString();

	const { data, error } = await supabase
		.from("svorms")
		.select()
		.lte("created_at", one_month_ago);

	if (error) {
		console.log(error);
		return null;
	}

	if (!data) {
		return null;
	}
	return data;
}

export async function delete_old_svorms() {
	console.log("delete svorms which are older than one month ...");
	const old_svorms = await get_old_svorms();
	if (!old_svorms) return;
	for (const svorm of old_svorms) {
		console.log("will delete svorm with ID " + svorm.id);
		await delete_svorm(svorm.id);
	}
	console.log("delete process is finished");
}

async function delete_svorm(id: number) {
	const questions = await get_questions(id);
	if (!questions) return;

	for (const question of questions) {
		if ("choices" in question) {
			await delete_multiple_choice(question.id);
		} else {
			await delete_simple_question(question.id);
		}
	}

	const { error } = await supabase
		.from("svorms")
		.delete()
		.eq("id", id);

	if (error) {
		console.log({ error });
	}
}
