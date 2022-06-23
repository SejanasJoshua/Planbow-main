
import { combineReducers } from 'redux';

// import filtersReducer from '../features/filters/filtersSlice';
import addUser from '../reducers/user';
import addWorkspace from '../reducers/workspace';
import addPlanboard from '../reducers/planboard';
import addSocket from '../reducers/socket';
import settings from '../reducers/settings';

const appReducer = combineReducers({
	user: addUser,
	workspace: addWorkspace,
	planboard: addPlanboard,
	socket: addSocket,
	settings: settings,
});

const rootReducer = (state, action) => {   
    if(action.type === 'RESET_STATE')
       state = undefined;

    return appReducer(state, action);
 };
 export default rootReducer;
