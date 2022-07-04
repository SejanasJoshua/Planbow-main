import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NonAuthenticatedRoutes = () => {
	const { user } = useSelector((state) => state);
	return user?.email ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default NonAuthenticatedRoutes;
