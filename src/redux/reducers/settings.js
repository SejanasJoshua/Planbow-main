const initialState = {
	URLHistory: '',
	planboardComponentsModal: false,
	planboardComponent: 'no-data',
	planboardCanvas: 'no-data',
};

const settings = (state = initialState, action) => {
	switch (action.type) {
		case 'URLHISTORY':
			return { ...state, URLHistory: action.payload };
		case 'PLANBOARDCOMPONENTSMODAL':
			return { ...state, planboardComponentsModal: action.payload };
		case 'PLANBOARDCOMPONENT':
			return { ...state, planboardComponent: action.payload };
		case 'PLANBOARDCANVAS':
			return { ...state, planboardCanvas: action.payload };
		default:
			return state;
	}
};

export default settings;
