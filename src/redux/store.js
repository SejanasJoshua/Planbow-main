import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import changeTheNumber from '@redux/reducers/updown';
// import filtersReducer from '../features/filters/filtersSlice';
import addUser from './reducers/user';
import addWorkspace from './reducers/workspace';
import addPlanboard from './reducers/planboard';
import addSocket from './reducers/socket';
import settings from './reducers/settings';

// export const store = configureStore({
// 	reducer: {
// 		updown: changeTheNumber,
// 		user: addUser,
// 		workspace: addWorkspace,
// 		planboard: addPlanboard,
// 		socket: addSocket,
// 		settings: settings,
// 		// filters: filtersReducer,
// 	},
// });

const reducers = combineReducers({
	updown: changeTheNumber,
	user: addUser,
	workspace: addWorkspace,
	planboard: addPlanboard,
	socket: addSocket,
	settings: settings,
});

const persistConfig = {
	key: 'planbow',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export default store;
