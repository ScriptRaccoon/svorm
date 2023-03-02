type simple_question = {
	type: "simple_question";
	required: boolean;
	question: string;
};

type multiple_choice = {
	type: "multiple_choice";
	required: boolean;
	question: string;
	choices: string[];
};

type question = simple_question | multiple_choice;

type svorm = {
	title: string;
	questions: question[];
};

type svorm_db = {
	id: string;
	created_at: string;
	title: string;
};

type element_save = {
	svorm_id: string;
	index: number;
};

type question_db = question & {
	id: string;
	created_at: string;
	svorm_id: string;
	index: number;
};

type multiple_choice_db = multiple_choice & {
	id: string;
	created_at: string;
	svorm_id: string;
	index: number;
};

type element_db = question_db | multiple_choice_db;

type submission = {
	answers_questions: {
		[k: string]: string;
	};
	answers_multiple_choices: {
		[k: string]: number | null;
	};
};
