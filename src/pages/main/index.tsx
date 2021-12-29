import { Col } from 'react-bootstrap';
import * as React from 'react';
import { useEffect } from 'react';
import StorageService, { StorageKeys } from '../../services/storage.service';

export default function MainComponent() {
	useEffect(() => {
		StorageService.set(StorageKeys.ShouldCache, true);
	}, []);

	return (
		<Col>
			<div className="p-5">
				<h1>Strona główna aplikacji BIM</h1>
				<p>Na feedback czekamy tu - bimspace@warbud.pl</p>
			</div>
		</Col>
	);
}
