export default function (num: number) {
	const rounded = Math.round(num * 10) / 10;
	const floor = Math.floor(num);
	const rest = rounded - floor;
	let outNum;
	if (rest > 0.75) outNum = floor + 1;
	else if (rest <= 0.75 && rest > 0.25) outNum = floor + 0.5;
	else outNum = floor;
	return outNum;
}
