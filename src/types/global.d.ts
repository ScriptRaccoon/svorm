// create types

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

// answers types

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

type simple_question_answer = { question_id: number; answer: string };

type multiple_choice_answer = { question_id: number; choice: number };

type answers = {
	simple_questions_answers: simple_question_answer[];
	multiple_choices_answers: multiple_choice_answer[];
};

// results types

type simple_question_result = {
	question_id: number;
	result: string[];
};

type multiple_choice_result = {
	question_id: number;
	result: number[];
};

type svorm_result = {
	svorm: svorm_db;
	questions: question_db[];
	simple_questions_results: simple_question_result[];
	multiple_choices_results: multiple_choice_result[];
};
