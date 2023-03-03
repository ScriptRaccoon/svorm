type simple_question = {
	required: boolean;
	question: string;
};

type multiple_choice = {
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
	svorm_id: id;
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

type simple_question_results = simple_question_db & {
	results: string[];
};
type multiple_choice_results = multiple_choice_db & {
	results: number[];
};

type question_results =
	| simple_question_results
	| multiple_choice_results;
