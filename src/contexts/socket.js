// import React, { createContext, useState } from 'react';
import React from 'react';
// import PropTypes from 'prop-types';

// const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
// 	const [socketData, setSocketData] = useState('');

// 	return (
// 		<SocketContext.Provider value={{ socketData, abc: '1234', setSocketData }}>
// 			{children}
// 		</SocketContext.Provider>
// 	);
// };

// SocketProvider.propTypes = {
// 	children: PropTypes.any,
// };

// export default SocketContext;
import socketio from 'socket.io-client';

export const socket = socketio.connect(process.env.REACT_SOCKET_URL);
export const SocketContext = React.createContext();
