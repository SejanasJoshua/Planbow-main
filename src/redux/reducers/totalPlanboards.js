const initialState = 'no-data';

const totalPlanboards = (state = initialState, action) => {
	switch (action.type) {
		case 'TOTALPLANBOARDS':
			return action.payload;
		default:
			return state;
	}
};

export default totalPlanboards;
