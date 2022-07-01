import React from 'react';
import Grid from '@mui/material/Grid';
import HomeComponent from '@components/HomeComponent';
import PlanboardComponents from '@components/PlanboardComponents';
import PlanboardCanvas from '@components/PlanboardCanvas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import // updateURLHistory,
// updatePlanboard,
// planboardComponentsModal,
'@redux/actions';
import { addActionItems,updateTotalPlanboard } from '@redux/actions';
// import axios from 'axios';
import axiosRequests from '@utils/axiosRequests';
import TeamsComponent from '../TeamsComponent';

function DashboardContent() {
	const navigate = useNavigate();
	const [selectedNav, setselectedNav] = React.useState('home');
	const user = useSelector((state) => state.user);
	const workspace = useSelector((state) => state.workspace);
	const dispatch = useDispatch();

	// const toggleDrawer = () => {
	// 	setOpen(!open);
	// };

	// const getNotifications = async () => {
	// 	try {
	// 		const response = await axiosRequests.getData(
	// 			`/notification/get?userID=${user._id}&email=${user.email}`
	// 		);
	// 		if (response.data.message === 'error') {
	// 			console.log('no notifications');
	// 		} else {
	// 			setNotifications(response.data.data);
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	const getPlanboards = async () => {
		try {
			const response = await axiosRequests.getData(
				`/planboard/get?workspace=${workspace._id}`
			);
			if (response.data.data === 'No-Data') {
				console.log('no planboards');
			} else {
				dispatch(updateTotalPlanboard(response.data.data));
			}
		} catch (e) {
			console.log(e);
		}
	};

	React.useEffect(() => {
		console.log('home');
		document.title = 'PlanBow - Home';
		if (user === 'no-data') navigate('/');
	}, []);

	React.useEffect(() => {
		if (workspace !== 'no-data') getPlanboards();
	}, [workspace]);

	return (
		<Grid>
			{selectedNav == 'home' ? (
				<HomeComponent  />
			) : selectedNav == 'planboards' ? (
				<PlanboardComponents
					setselectedNav={setselectedNav}
				/>
			) : selectedNav == 'canvas' ? (
				<PlanboardCanvas />
			) : selectedNav == 'teams' ? (
				<TeamsComponent />
			) : null}
		</Grid>
	);
}

export default function Dashboard() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		actionItemData();
	}, []);
	const actionItemData = async () => {
		const response = await axiosRequests.getData(
			'/planboardComponent/get?planboardID=624dba3e9c437cb32217cb90'
		);
		if (response?.data?.data?.length) {
			dispatch(addActionItems(response?.data?.data));
		}
	};
	return <DashboardContent />;
}
