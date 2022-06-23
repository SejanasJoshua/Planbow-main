const initialState = 'no-data';

const addWorkspace = (state = initialState, action) => {
	switch (action.type) {
	case 'WORKSPACE':
		return action.payload;
	default:
		return state;
	}
};

export default addWorkspace;
