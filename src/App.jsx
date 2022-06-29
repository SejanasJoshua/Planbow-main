import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './planbow-config/routesConfig';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@shared/theme';
import { SocketContext, socket } from '@contexts/socket';

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<SocketContext.Provider value={socket}>
					<RouterComponent />
				</SocketContext.Provider>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
