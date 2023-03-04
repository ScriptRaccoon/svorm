export function scroll_to_bottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

export function frequency(arr: number[], num: number): number {
	let f = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === num) f++;
	}
	return f++;
}
