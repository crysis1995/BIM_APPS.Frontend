import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import 'jest-canvas-mock';
import { Provider } from 'react-redux';
import { rootReducer } from '../../state/reducers';

// Import your own reducer

function render<initialState>(
	ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
	initialState: initialState,
) {
	const store = createStore(rootReducer, initialState);
	const Wrapper: React.FunctionComponent = ({ children }) => {
		return <Provider store={store}>{children}</Provider>;
	};
	return rtlRender(ui, { wrapper: Wrapper });
}

// // re-export everything
// export * from '@testing-library/react';
// override render method
export { render };
