function isChanged(valueA: any, valueB: any) {
	return JSON.stringify(valueA) !== JSON.stringify(valueB);
}

export default isChanged;
