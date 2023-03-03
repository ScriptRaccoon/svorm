type simple_question = {
	type: "simple_question";
	required: boolean;
	question: string;
	choices: null;
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
	id: number;
	created_at: string;
	title: string;
};

type _db = {
	id: number;
	created_at: string;
	svorm_id: string;
	index: number;
};

type simple_question_db = simple_question & _db;

type multiple_choice_db = multiple_choice & _db;

type question_db = simple_question_db | multiple_choice_db;

type simple_question_db_answer = simple_question_db & {
	answer: string;
};

type multiple_choice_db_answer = multiple_choice_db & {
	choice: null | number;
};

type question_answer =
	| simple_question_db_answer
	| multiple_choice_db_answer;

type answer = { question_id: number } & (
	| { answer: string }
	| { choice: null | number }
);