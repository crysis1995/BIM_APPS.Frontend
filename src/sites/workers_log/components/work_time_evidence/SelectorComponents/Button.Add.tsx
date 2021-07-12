import { Button } from 'react-bootstrap';
import React from 'react';

export function ButtonAdd(props: { onClick: () => void; message: string }) {
	return (
		<Button
			className={'p-1 pb-0 mb-0'}
			variant={'outline-secondary'}
			size={'sm'}
			id={'add_crew'}
			onClick={props.onClick}
			block>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-plus mr-2"
				viewBox="0 0 16 16">
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
			</svg>
			{props.message}
		</Button>
	);
}
