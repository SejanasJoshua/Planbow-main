const initialState = 'no-data';

const addUser = (state = initialState, action) => {
	switch (action.type) {
	case 'USER':
		return action.payload;
	case 'LOGOUT':
		return initialState;
	default:
		return state;
	}
};

export default addUser;
