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

type _db = {
	id: string;
	created_at: string;
	svorm_id: string;
	index: number;
};

type simple_question_db = simple_question & _db;

type multiple_choice_db = multiple_choice & _db;

type question_db = simple_question_db | multiple_choice_db;

type element_save = {
	svorm_id: string;
	index: number;
};

type submission = {
	answers_simple_questions: {
		[k: string]: string;
	};
	answers_multiple_choices: {
		[k: string]: number | null;
	};
};
