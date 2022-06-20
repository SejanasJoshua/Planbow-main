import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './planbow-config/routesConfig';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@shared/theme';
// import { useSelector } from 'react-redux';
// import SocketContext from './contexts/socket';
// import { createSocket } from './components/functions';

const App = () => {
	// const user = useSelector((state) => state.user);
	// const { socketData, abc } = React.createContext(SocketContext);
	// React.useEffect(() => {
	// 	if (user) {
	// 		// if (!socketData) setSocketData(createSocket());
	// 		console.log(abc);
	// 	} else {
	// 		if (socketData) {
	// 			socketData.emit('closeConnection');
	// 		}
	// 	}
	// 	// user && !socketData && createSocket(user);
	// }, [user]);
	// React.useEffect(() => {
	// 	console.log(abc);
	// }, [abc]);
	// React.useEffect(() => {
	// 	if (socketData) {
	// 		const { _id, fullName, email, defaultWorkspace } = user;
	// 		socketData.emit('newUser', { _id, fullName, email, defaultWorkspace });
	// 	}
	// }, [socketData]);
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<RouterComponent />
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
