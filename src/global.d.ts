type questionElement = {
	id: string;
	required: boolean;
	question: string;
};

type questionElementView = questionElement & {
	answer: string | null;
};

type choiceElement = {
	id: string;
	required: boolean;
	prompt: string;
	choices: string[];
};

type choiceElementView = choiceElement & {
	answer: number | null;
};

type svormElement = questionElement | choiceElement;

type svormElementView = questionElementView | choiceElementView;

type svorm = {
	id: string;
	title: string;
	elements: svormElement[];
};

type svormView = {
	id: string;
	title: string;
	elements: svormElementView[];
};
