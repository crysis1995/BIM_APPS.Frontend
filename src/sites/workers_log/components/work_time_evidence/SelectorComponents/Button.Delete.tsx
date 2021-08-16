import React from 'react';
import { Button } from 'react-bootstrap';

export function ButtonDelete(props: { onClick: () => void; message: string }) {
	return (
		<Button className={'p-1 mt-1'} variant={'outline-secondary'} size={'sm'} id={'delete_crew'} onClick={props.onClick} block>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-dash mr-2"
				viewBox="0 0 16 16">
				<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
			</svg>
			{props.message}
		</Button>
	);
}
