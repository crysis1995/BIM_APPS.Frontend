import React from 'react';
import { CommentaryElement } from '../../../../generated/graphql';
import dayjs from 'dayjs';
import { UserEmail } from './UserEmail';
import { Col, Row } from 'react-bootstrap';

type Props = {
	commentaryElement: CommentaryElement;
};

export default function Comment(props: Props) {
	return (
		<Row className={'p-1 border-bottom'}>
			<Col xs={4}>
				<h6>
					<UserEmail userId={props.commentaryElement.userId} />
				</h6>
				<span className={'small text-muted mr-3'}>
					{dayjs(props.commentaryElement.updatedAt).format('YYYY-MM-DD HH:mm')}
				</span>
			</Col>
			<Col>
				<p>{props.commentaryElement.content}</p>
			</Col>
		</Row>
	);
}
