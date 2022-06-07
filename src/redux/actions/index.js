export const incNumber = (num) => {
	return {
		type: 'INCREMENT',
		payload: num,
	};
};

export const decNumber = () => {
	return {
		type: 'DECREMENT',
	};
};

export const updateUser = (data) => {
	return {
		type: 'USER',
		payload: data,
	};
};

export const updateWorkspace = (data) => {
	return {
		type: 'WORKSPACE',
		payload: data,
	};
};
export const updatePlanboard = (data) => {
	return {
		type: 'PLANBOARD',
		payload: data,
	};
};
export const updateSocket = (data) => {
	return {
		type: 'SOCKET',
		payload: data,
	};
};
export const updateURLHistory = (data) => {
	return {
		type: 'URLHISTORY',
		payload: data,
	};
};

export const planboardComponentsModal = (data) => {
	return {
		type: 'PLANBOARDCOMPONENTSMODAL',
		payload: data,
	};
};

export const updatePlanboardComponent = (data) => {
	return {
		type: 'PLANBOARDCOMPONENT',
		payload: data,
	};
};

export const updatePlanboardCanvas = (data) => {
	return {
		type: 'PLANBOARDCANVAS',
		payload: data,
	};
};
