const initialState = {
	planboards: false,
};

const changes = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGEPLANBOARD':
			return { ...state, planboards: action.type };
		default:
			return state;
	}
};

export default changes;
