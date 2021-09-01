import React from 'react';

type ComponentProps = {
	description: { key?: string; description?: string };
};

function TableHeaderCell(props: ComponentProps) {
	return <th>{props.description.description || props.description.key || ''}</th>;
}

export default TableHeaderCell;

