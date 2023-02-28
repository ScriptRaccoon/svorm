import { get_elements } from "../../../db/element";
import { get_svorm } from "../../../db/svorm";
import type { PageServerLoad } from "./$types";

const example_svorm: svorm_db = {
	id: "asdasjkhdjwe",
	title: "Weekday survey"
};

const example_elements: element_db[] = [
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
		],
		svorm_id: "asdasjkhdjwe",
		index: 0
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
		],
		svorm_id: "asdasjkhdjwe",
		index: 1
	},
	{
		required: true,
		id: "123",
		question: "How are you today?",
		svorm_id: "asdasjkhdjwe",
		index: 2
	}
];

export const load = (async ({ params }) => {
	const svorm_id = params.id;
	// TODO: error handling
	const svorm = ((await get_svorm(svorm_id)).data as svorm_db[])[0];
	const elements = await get_elements(svorm_id);
	console.log(elements);
	return { svorm, elements };
}) satisfies PageServerLoad;
