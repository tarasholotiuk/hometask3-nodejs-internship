export const parseDate = (content: string) => {
	const regex =
		/(3[01]|[12][0-9]|0?[1-9])[\/.-](1[0-2]|0?[1-9])[\/.-](?:[0-9]{2})?[0-9]{2}/gm;
	let dates: String[] | String | null | undefined;
	content.match(regex) !== null
		? (dates = content.match(regex)?.join(", "))
		: (dates = "");
	return dates;
};

export const setIconTask = (category: String) => {
	let iconTask = "";
	switch (category) {
		case "Idea":
			iconTask = "idea.png";
			break;
		case "Random Thought":
			iconTask = "lateral.png";
			break;
		case "Task":
			iconTask = "shopping-cart.png";
			break;
		default:
			iconTask = "shopping-cart.png";
			break;
	}
	return iconTask;
};