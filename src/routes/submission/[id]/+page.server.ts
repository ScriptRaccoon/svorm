import type { PageServerLoad } from "./$types";

const exampleSvorm: svorm = {
	id: "asdasjkhdjwe",
	title: "Weekday survey",
	elements: [
		{
			required: true,
			id: "59a01248-bb5b-4d45-8081-ee17f0e0511d",
			question: "What is your employment status?",
			choices: [
				"Student",
				"Worker",
				"Employee",
				"Self-employed",
				"Director",
				"None"
			]
		},
		{
			required: true,
			id: "d767abac-496a-481e-964e-1d0fd5ad4d5e",
			question: "What is your favorite day of the week?",
			choices: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday"
			]
		},
		{
			required: false,
			id: "35892eb5-74f4-4406-bdef-e27caebccfa3",
			question: "Why is that your favorite day?"
		}
	]
};

async function getSvorm(id: string): Promise<svorm | null> {
	// TODO: get this svorm from database
	return exampleSvorm;
}

export const load = (async ({ params }) => {
	const id = params.id;
	const svorm = await getSvorm(id);
	return { svorm };
}) satisfies PageServerLoad;
