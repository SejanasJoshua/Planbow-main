import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState }  from '@redux/actions';

const Logout = () => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(resetState());
		// navigate('/login');
	}, []);
	return <div>Logout</div>;
};

export default Logout;
