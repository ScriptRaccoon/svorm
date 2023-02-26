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

type svormElement = questionElement | choiceElement;

type svorm = {
	id: string;
	title: string;
	elements: svormElement[];
};
