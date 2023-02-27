type question = {
	required: boolean;
	question: string;
	id: string;
};

type question_create = Omit<question, "id">;

type multiple_choice = {
	required: boolean;
	question: string;
	choices: string[];
	id: string;
};

type multiple_choice_create = Omit<multiple_choice, "id">;

type element = question | multiple_choice;
type element_create = question_create | multiple_choice_create;

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
