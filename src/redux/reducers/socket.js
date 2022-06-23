const initialState = '';

const addSocket = (state = initialState, action) => {
	switch (action.type) {
	case 'SOCKET':
		return action.payload;
	default:
		return state;
	}
};

export default addSocket;
