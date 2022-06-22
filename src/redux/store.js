import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
// import filtersReducer from '../features/filters/filtersSlice';

import rootReducer from './reducers/rootReducer';

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

const reducers = rootReducer;

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
