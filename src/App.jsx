import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './planbow-config/routesConfig';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@shared/theme';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<RouterComponent />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
