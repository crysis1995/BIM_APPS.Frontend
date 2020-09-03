export const CALL_1 = 'CALL_1';
export const CALL_2 = 'CALL_2';
export const CALL_3 = 'CALL_3';

const call_1 = (data) => ({
	type: CALL_1,
	data,
});
const call_2 = (data) => ({
	type: CALL_2,
	data,
});
const call_3 = (data) => ({
	type: CALL_3,
	data,
});

function call1(dispatch) {
	dispatch(call_1(0));
	setTimeout(() => {
		dispatch(call_1(1000));
	}, 1000);
}

function call2(dispatch) {
	setTimeout(() => {
		dispatch(call_2(5000));
	}, 5000);
}

function call3(dispatch) {
	setTimeout(() => {
		dispatch(call_3(3000));
	}, 3000);
}

export { call1, call2, call3 };
