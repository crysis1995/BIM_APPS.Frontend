import React, { useEffect, useRef } from 'react';

function Input(props: { checked?: boolean; indeterminate?: boolean; OnClick?: () => void }) {
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.indeterminate = props.indeterminate || false;
			ref.current.checked = props.checked || false;
		}
	}, [props.checked, props.indeterminate, ref]);

	function HandleClick() {
		if (props.OnClick) props.OnClick();
	}
	return <input type="checkbox" onClick={HandleClick} ref={ref} />;
}

export default React.memo(Input);
