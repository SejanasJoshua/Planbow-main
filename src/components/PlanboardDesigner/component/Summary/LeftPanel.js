import React, { useEffect, useState } from 'react';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axiosRequests from '@utils/axiosRequests';
import { useSelector, useDispatch } from 'react-redux';
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
	TextareaAutosize,
	Switch,
	FormGroup,
	FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import {
	updatePlanboard,
	planboardComponentsModal,
	updateTotalPlanboard,
} from '@redux/actions';

export default function LeftPanel(props) {
	const { user: User, workspace: Workspace } = useSelector((state) => state);
	const [visible, setVisible] = useState(true);
	const dispatch = useDispatch();
	const ParentState = props?.location?.state;
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
	const [editButton, toggleSwitch] = useState(false);
	const [workspaceUsers, setWorkspaceUsers] = useState([]);
	const [state, setState] = useState({
		creator: props?.creator?.fullName,
		title: props?.location?.state
			? ParentState?.planboard?.name
			: props?.Planboard?.name ?? '',
		description: props?.location?.state
			? ParentState?.planboard?.description
			: props?.Planboard?.description ?? '',
		coCreators: [],
		users: [],
		startDate: props?.startDate ?? new Date(),
		endDate: props?.endDate ?? defaultEndDate(),
		error: {
			title: false,
			description: false,
		},
	});

	const [popup, setPopUp] = useState({
		message: '',
		type: '',
	});
	const removeUserFromCoCreators = (newUser, type) => {
		let updatedUsers = workspaceUsers;
		setState({
			...state,
			[type]: [...state[type].filter((user) => user != newUser)],
		});
		updatedUsers
			.filter((user) => user.email == newUser)
			.map((user) => (user['type'] = undefined));
		setWorkspaceUsers([...updatedUsers]);
	};
	const checkIfUserExists = (newUser, type) => {
		const userExist = state[type].filter((user) => user == newUser).length;
		if (userExist) removeUserFromCoCreators(newUser, type);
		return !userExist;
	};
	const addUser = (selected, { props: { value } }) => {
		let updatedUsers = workspaceUsers;
		if (state.users.length == 0 || checkIfUserExists(value, 'users')) {
			updatedUsers
				.filter((user) => user.email == value)
				.map((user) => (user['type'] = 'user'));
			setWorkspaceUsers([...updatedUsers]);
			setState({ ...state, users: [...state.users, value] });
		}
	};
	const addCoCreator = (selected, { props: { value } }) => {
		let updatedUsers = workspaceUsers;
		if (
			state.coCreators.length == 0 ||
			checkIfUserExists(value, 'coCreators')
		) {
			updatedUsers
				.filter((user) => user.email == value)
				.map((user) => (user['type'] = 'coCreator'));
			setWorkspaceUsers([...updatedUsers]);
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
	const checkIfTitleExists = (title) => {
		if (
			props?.totalPlanboards.filter(
				(planboard) => planboard?.name.toLowerCase() == title.toLowerCase()
			).length
		)
			return true;
		return false;
	};
	const checkFields = () => {
		let error = false;
		if (!state?.title.length || checkIfTitleExists(state?.title)) {
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
	const toggleApi = async (endpoint) => {
		let requestData = '';
		if (endpoint.split('/').slice(-1)[0].toLowerCase() === 'create') {
			requestData = {
				name: state.title,
				workspace: Workspace._id,
				createdBy: { name: User.fullName, email: User.email },
				// createdBy: User._id,
				description: state.description,
				users: workspaceUsers.filter((user) => user.type),
				notificationTypes: [],
				endDate: state.endDate,
				startDate: state.startDate,
			};
			const response = await axiosRequests.postData(endpoint, {
				...requestData,
			});
			if (response?.data?.message === 'success') {
				dispatch(updatePlanboard(response.data.data));
				updateTotalPlanboards(response.data.data, 'create');
			}
			return response;
		}
		requestData = {
			name: state.title,
			users: workspaceUsers.filter((user) =>
				props?.Planboard?.users.find((prevUser) => {
					if (user._id == prevUser._id) {
						if (user.type != prevUser.type) {
							if (user.type) {
								if (prevUser.type) {
									return (user['removed'] = true), (user['new'] = true);
								} 
							}
							return (user['removed'] = true);
						}
						return user;
					}
					else{
						if(user.type && !props?.Planboard?.users.filter(plan=>plan.email==user.email).length) return  (user['new'] = true);
					}
				})
			),
			endDate: state.endDate,
			description: state.description,
			planboardID: ParentState?.planboard?._id,
			startDate: state.startDate,
			workspace: Workspace._id,
		};
		const response = await axiosRequests.putData(endpoint, { ...requestData });
		if (response?.data?.message === 'success') {
			dispatch(updatePlanboard(requestData));
			updateTotalPlanboards(requestData, 'update');
		}
		return response;
	};
	const updateTotalPlanboards = (data, type) => {
		if (type == 'create') {
			return dispatch(
				updateTotalPlanboard([...props.totalPlanboards, { ...data }])
			);
		}
		let planboards = props.totalPlanboards;
		planboards[
			planboards.findIndex((planboard) => planboard._id == data.planboardID)
		] = { ...data, isDeleted: false };
		return dispatch(updateTotalPlanboard([...planboards]));
	};
	const handleSubmit = async () => {
		if (!checkFields()) {
			const response = ParentState?.newPlanboard
				? await toggleApi('/planboard/create')
				: await toggleApi('/planboard/update');
			// if (response?.data?.data) {
			// 	dispatch(updatePlanboard(response.data.data));
			// }
			if (response?.data?.message === 'success') {
				setPopUp({
					message: ParentState?.newPlanboard
						? 'Planboard is successfully created'
						: 'Planboard is successfully updated',
					type: 'success',
				});
				dispatch(planboardComponentsModal(true));
				props.setselectedNav('ideacanvas');
			} else {
				setPopUp({ message: 'Some Server Error', type: 'error' });
			}
		}
	};
	const toggleEdit = () => {
		if (ParentState?.newPlanboard) return true;
		return editButton;
	};

	const getValidatedUsers = async (users) => {
		const response = await axiosRequests.getData(
			`/user?validateUsers=${users}`
		);
		if (response?.data?.message === 'success' && response?.data.data?.length) {
			if (ParentState?.newPlanboard) {
				setWorkspaceUsers(response?.data?.data);
			} else {
				response?.data?.data
					.filter((elem) =>
						props?.Planboard?.users?.find((plan) => {
							return elem._id === plan._id ? (elem['type'] = plan?.type) : null;
						})
					)
					.map((data) => data);
				setWorkspaceUsers(response?.data?.data);
			}
		}
	};
	const getWorkspaceUsers = async (id) => {
		const response = await axiosRequests.getData(
			`/workspace/get?workspaceID=${id}`
		);
		if (response?.data?.data?.users?.length) {
			getValidatedUsers(response.data.data.users);
		}
	};

	useEffect(() => {
		Workspace && getWorkspaceUsers(Workspace._id);
		if (!ParentState?.newPlanboard) {
			setState({
				...state,
				coCreators: props?.Planboard?.users
					?.filter((user) => user.type == 'coCreator')
					.map((data) => data.email),
				users: props?.Planboard?.users
					?.filter((user) => user.type == 'user')
					.map((data) => data.email),
				startDate: props?.Planboard?.startDate,
				endDate: props?.Planboard?.endDate,
				description: props?.Planboard?.description,
			});
		}
	}, []);

	return (
		<>
			{!ParentState?.newPlanboard ? (
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={editButton}
								onChange={() => toggleSwitch(!editButton)}
								color='warning'
							/>
						}
						label='Edit'
					/>
				</FormGroup>
			) : null}
			{
				<Grid
					style={{ border: '2px 2px solid black' }}
					container
					direction='column'
					justifyContent='space-around'
					alignItems='flex-start'
				>
					<Stack spacing={7} direction='column'>
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
									{toggleEdit() ? (
										<Grid item lr={18}>
											<Input
												onChange={(e) => {
													setState((prevState) => ({
														...state,
														title: e.target.value,
														error: { ...prevState.error, title: false },
													}));
												}}
												value={state?.title}
											/>
											{state?.error?.title ? (
												<Typography
													variant='body2'
													gutterBottom
													style={{ width: '100%', ...errorClass }}
												>
													{state.title.length
														? 'Planboard already exists'
														: 'Please enter the title'}
												</Typography>
											) : (
												''
											)}
										</Grid>
									) : (
										<Grid item lr={18}>
											{state?.title}
										</Grid>
									)}
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
												...workspaceUsers
													.filter(
														(user) =>
															user.type == 'user' || user.type == undefined
													)
													.map((user) => (
														<MenuItem key={user._id} value={user.email}>
															{user.fullName}
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
												...workspaceUsers
													.filter(
														(user) =>
															user.type == 'coCreator' || user.type == undefined
													)
													.map((user) => (
														<MenuItem key={user._id} value={user.email}>
															{user.fullName}
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
									<Grid
										item
										style={{
											width: '100%',
											...(toggleEdit() ? {} : { pointerEvents: 'none' }),
										}}
									>
										{toggleEdit() ? (
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
										) : (
											new Date(state.startDate).toDateString()
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
									<Grid item>End Date:</Grid>
									<Grid
										item
										style={{
											width: '100%',
											...(toggleEdit() ? {} : { pointerEvents: 'none' }),
										}}
									>
										{toggleEdit() ? (
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
										) : (
											new Date(state.endDate).toDateString()
										)}
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
									{toggleEdit() ? (
										<Grid
											item
											lr={18}
											style={{
												...(toggleEdit() ? {} : { pointerEvents: 'none' }),
											}}
										>
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
									) : (
										<Grid item lr={18}>
											{state?.description}
										</Grid>
									)}
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
								{toggleEdit() ? (
									<Button variant='contained' onClick={handleSubmit}>
										Submit
									</Button>
								) : null}
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			}
			{popup.type != '' ? (
				<PopUpComponent
					message={popup.message}
					type={popup.type}
					visible={visible}
					setVisible={setVisible}
				/>
			) : null}
		</>
	);
}
LeftPanel.propTypes = {
	creator: PropTypes.object,
	Planboard: PropTypes.object,
	location: PropTypes.object,
	setselectedNav: PropTypes.func,
	totalPlanboards: PropTypes.array,
	startDate: PropTypes.string,
	endDate: PropTypes.string,
	users: PropTypes.array,
};
