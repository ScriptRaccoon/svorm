type questionElement = {
	id: string;
	required: boolean;
	question: string;
};

type choiceElement = {
	id: string;
	required: boolean;
	prompt: string;
	choices: string[];
};

type svorm = {
	id: string;
	title: string;
	elements: svormElement[];
};

type svormElement = questionElement | choiceElement;

type questionSubmission = questionElement & {
	answer: string | null;
};

type choiceSubmission = choiceElement & {
	answer: number | null;
};

type svormElementSubmission = questionSubmission | choiceSubmission;

type svormSubmission = {
	id: string;
	title: string;
	elements: svormElementSubmission[];
};
