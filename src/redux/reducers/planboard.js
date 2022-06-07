const initialState = '';

const addPlanboard = (state = initialState, action) => {
	switch (action.type) {
		case 'PLANBOARD':
			return action.payload;
		default:
			return state;
	}
};

export default addPlanboard;
