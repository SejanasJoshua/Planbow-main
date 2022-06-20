import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const [socketData, setSocketData] = useState('');

	return (
		<SocketContext.Provider value={{ socketData, abc: '1234', setSocketData }}>
			{children}
		</SocketContext.Provider>
	);
};

SocketProvider.propTypes = {
	children: PropTypes.any,
};

export default SocketContext;
