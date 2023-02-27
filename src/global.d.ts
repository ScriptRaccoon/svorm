type question = {
	id: string;
	required: boolean;
	question: string;
};

type multiple_choice = {
	id: string;
	required: boolean;
	question: string;
	choices: string[];
};

type element = question | multiple_choice;

type svorm = {
	id: string;
	title: string;
	elements: element[];
};

type question_submission = question & {
	answer: string | null;
};

type multiple_choice_submission = multiple_choice & {
	answer: number | null;
};

type element_submission =
	| question_submission
	| multiple_choice_submission;

type svorm_submission = {
	id: string;
	title: string;
	elements: element_submission[];
};
