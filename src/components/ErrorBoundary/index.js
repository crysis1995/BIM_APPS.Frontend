import React from 'react';
import { Alert } from 'react-bootstrap';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: '' };
	}

	static getDerivedStateFromError(error) {
		// Zaktualizuj stan, aby następny render pokazał zastępcze UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Możesz także zalogować błąd do zewnętrznego serwisu raportowania błędów
		// logErrorToMyService(error, errorInfo);
		this.setState({ error: errorInfo });
	}

	render() {
		if (this.state.hasError) {
			// Możesz wyrenderować dowolny interfejs zastępczy.
			return <Alert variant={'danger'}>{this.state.error || 'Coś poszło nie tak ;('}</Alert>;
		}

		return this.props.children;
	}
}
