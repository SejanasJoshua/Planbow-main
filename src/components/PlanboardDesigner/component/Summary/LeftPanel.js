import React, { useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axiosRequests from '@utils/axiosRequests';
import { useSelector,useDispatch } from 'react-redux';
import PopUpComponent from '../../../PopUpComponent';
import {
	Input,
	Typography,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	OutlinedInput,
	TextField,
	Stack,
	Button,
	TextareaAutosize
} from '@mui/material';
import PropTypes from 'prop-types';
import { updatePlanboard } from '@redux/actions';
export default function LeftPanel(props) {
	const { user: User,workspace:Workspace } = useSelector((state) => state);
	const dispatch= useDispatch();
	const users = [
		{ id: 1, email: '1@gmail.com', name: '1John' },
		{ id: 2, email: '2@gmail.com', name: '2John' },
		{ id: 3, email: '3@gmail.com', name: '3John' },
		{ id: 4, email: '4@gmail.com', name: '4John' },
		{ id: 5, email: '5@gmail.com', name: '5John' },
	];
	const INVALID_DATE = 'Invalid Date';
	const errorClass = {
		width: '100%',
		padding: '3px 6px',
		borderRadius: '5px',
		color: 'red',
		fontSize: '1rem',
		fontWeight: '600',
	};
	const defaultEndDate = () => {
		const date = new Date();
		return new Date(date.setDate(date.getDate() + 1));
	};
	// const [showButton, setButton] = useState(
	// 	props?.location?.state ? true : false
	// );
	const [state, setState] = useState({
		creator: props?.creator?.fullName,
		title: props?.location?.state ? '' : props?.Planboard?.name ?? '',
		description: props?.location?.state
			? ''
			: props?.Planboard?.description ?? '',
		coCreators: [],
		users: [],
		startDate: new Date(),
		endDate: defaultEndDate(),
		error: {
			title: false,
			description: false,
		},
	});
	const [popup,setPopUp]=useState({
		message:'',
		type:'',
	})
	const removeUserFromCoCreators = (newUser, type) => {
		setState({
			...state,
			[type]: [...state[type].filter((user) => user != newUser)],
		});
	};
	const checkIfUserExists = (newUser, type) => {
		const userExist = state[type].filter((user) => user == newUser).length;
		if (userExist) removeUserFromCoCreators(newUser, type);
		return !userExist;
	};
	const addUser = (selected, { props: { value } }) => {
		if (state.coCreators.length == 0 || checkIfUserExists(value, 'users')) {
			setState({ ...state, users: [...state.users, value] });
		}
	};
	const addCoCreator = (selected, { props: { value } }) => {
		if (
			state.coCreators.length == 0 ||
			checkIfUserExists(value, 'coCreators')
		) {
			setState({ ...state, coCreators: [...state.coCreators, value] });
		}
	};
	const changeEndDate = (startDate) => {
		const date = new Date(
			`${new Date(startDate).getFullYear()}-${
				new Date(startDate).getMonth() + 1
			}-${new Date(startDate).getDate()}`
		);
		date.setDate(date.getDate() + 1);
		return date;
	};
	const setDate = (value, keyboardInputValue, type) => {
		if (value == INVALID_DATE) return;
		if (keyboardInputValue) {
			setState({ ...state, [type]: keyboardInputValue });
		} else {
			setState({ ...state, [type]: value });
			if (type == 'startDate') {
				setState({
					...state,
					['endDate']: changeEndDate(value),
					[type]: value,
				});
			}
		}
	};
	const checkFields = () => {
		let error = false;
		if (!state?.title.length) {
			setState((prevState) => ({
				...state,
				error: { ...prevState.error, title: true },
			}));
			error = true;
		} else {
			setState((prevState) => ({
				...state,
				error: { ...prevState.error, title: false },
			}));
		}
		if (!state?.description.length) {
			setState((prevState) => ({
				...state,
				error: { ...prevState.error, description: true },
			}));
			error = true;
		} else {
			setState((prevState) => ({
				...state,
				error: { ...prevState.error, description: false },
			}));
		}
		return error;
	};
	const handleSubmit = async () => {
		if (!checkFields()) {
			const response=await axiosRequests.postData('/planboard/create', {
				name: state.title,
				workspace: Workspace._id,
				user: User._id,
				description: state.description,
				users: state.users,
				notificationTypes: [],
				endDate: state.endDate,
				startDate: state.startDate,
			});
		if(response?.data?.data){
			console.log(response.data.data);
			dispatch(updatePlanboard(response.data.data));
		}
		}
		console.log(state);
	};
	
	return (
		<>
			{
				<Grid
					style={{ border: '2px 2px solid black' }}
					container
					direction='column'
					justifyContent='space-around'
					alignItems='flex-start'
				>
					<Stack spacing={2} direction='column'>
						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Creator:</Grid>
									<Grid item lr={18}>
										{' '}
										{`${props?.creator?.fullName ?? ''}`}
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Title:</Grid>
									<Grid item lr={18}>
										<Input
											onChange={(e) => {
												setState({ ...state, title: e.target.value });
											}}
											value={state?.title}
										/>
										{state?.error?.title ? (
											<Typography
												variant='body2'
												gutterBottom
												style={{ width: '100%', ...errorClass }}
											>
												Please enter the title
											</Typography>
										) : (
											''
										)}
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Add User:</Grid>
									<Grid item style={{ width: '100%' }}>
										<InputLabel id='demo-simple-select-label'>User</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={state.users}
											style={{ width: '100%' }}
											multiple
											defaultValue={'User'}
											label='User'
											input={<OutlinedInput label='Name' />}
											onChange={(e, children) =>
												addUser(e.target.value, children)
											}
										>
											{[
												...users.map((user) => (
													<MenuItem key={user.id} value={user.email}>
														{user.name}
													</MenuItem>
												)),
											]}
										</Select>
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Add Co-Creators:</Grid>
									<Grid item style={{ width: '100%' }}>
										<InputLabel id='demo-simple-select-label'>
											Co-Creator
										</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={state.coCreators}
											style={{ width: '100%' }}
											multiple
											defaultValue={'User'}
											label='User'
											input={<OutlinedInput label='Name' />}
											onChange={(e, children) =>
												addCoCreator(e.target.value, children)
											}
										>
											{[
												...users.map((user) => (
													<MenuItem key={user.id} value={user.email}>
														{user.name}
													</MenuItem>
												)),
											]}
										</Select>
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Start Date:</Grid>
									<Grid item style={{ width: '100%' }}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DesktopDatePicker
												label='Date desktop'
												inputFormat='dd/MM/yyyy'
												value={state.startDate}
												onChange={(value, keyboardInputValue) =>
													setDate(value, keyboardInputValue, 'startDate')
												}
												minDate={new Date()}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='row'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>End Date:</Grid>
									<Grid item style={{ width: '100%' }}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DesktopDatePicker
												label='End Date'
												inputFormat='dd/MM/yyyy'
												value={state.endDate}
												onChange={(value, keyboardInputValue) =>
													setDate(value, keyboardInputValue, 'endDate')
												}
												minDate={new Date().setDate(new Date().getDate() + 1)}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Typography variant='h5' style={{ width: '100%' }}>
								<Grid
									container
									direction='column'
									width='25rem'
									justifyContent='space-between'
									alignItems='flex-start'
								>
									<Grid item>Description:</Grid>
									<Grid item lr={18}>
										<TextareaAutosize
											maxRows={4}
											aria-label='maximum height'
											style={{ width: 200 }}
											minRows={4}
											value={state?.description}
											onChange={(e) => {
												setState({ ...state, description: e.target.value });
											}}
										/>
										{state?.error?.description ? (
											<Typography
												variant='body2'
												gutterBottom
												style={{ width: '100%', ...errorClass }}
											>
												Please enter the description
											</Typography>
										) : (
											''
										)}
									</Grid>
								</Grid>
							</Typography>
						</Grid>

						<Grid item>
							<Grid
								container
								direction='row'
								width='25rem'
								justifyContent='space-between'
								alignItems='flex-start'
							>
								{/* {showButton ? (
									<Button variant='contained' onClick={handleSubmit}>
										Submit
									</Button>
								) : null} */}
								{props?.location?.state ? (
									<Button variant='contained' onClick={handleSubmit}>
										Submit
									</Button>
								) : null}
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			}
			<PopUpComponent message={popup.message} type={popup.type}/>
		</>
	);
}
LeftPanel.propTypes = {
	creator: PropTypes.object,
	Planboard: PropTypes.object,
	location: PropTypes.object,
};
