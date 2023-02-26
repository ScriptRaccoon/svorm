type question = {
	id: string;
	required: boolean;
	question: string;
};

type multipleChoice = {
	id: string;
	required: boolean;
	question: string;
	choices: string[];
};

type element = question | multipleChoice;

type svorm = {
	id: string;
	title: string;
	elements: element[];
};

type questionSubmission = questionElement & {
	answer: string | null;
};

type multipleChoiceSubmission = multipleChoice & {
	answer: number | null;
};

type elementSubmission = questionSubmission | multipleChoiceSubmission;

type svormSubmission = {
	id: string;
	title: string;
	elements: elementSubmission[];
};
