type question = {
	required: boolean;
	question: string;
};

type multiple_choice = {
	required: boolean;
	question: string;
	choices: string[];
};

type element = question | multiple_choice;

type svorm_db = {
	id: string;
	title: string;
};

type question_db = question & {
	id: string;
	svorm_id: string;
	index: number;
};

type multiple_choice_db = multiple_choice & {
	id: string;
	svorm_id: string;
	index: number;
};

type element_db = question_db | multiple_choice_db;
