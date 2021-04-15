import { render as rtlRender } from '@testing-library/react';
// test-utils.ts
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Import your own reducer
import { rootReducer } from './reducers';

function render(ui, { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
