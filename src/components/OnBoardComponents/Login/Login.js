import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { updateUser, updateWorkspace } from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axiosRequests from '@utils/axiosRequests';
import Divider from '@mui/material/Divider';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { SocketContext } from '@contexts/socket';
import labels from '@shared/labels';
import { ICONS } from '@shared/assets';

export default function Login({ setOnboardNav, whiteBoxCenter, socialIcon }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const socket = useContext(SocketContext);

	// const addNewUserSocket = (userData) => {
	// 	// const {
	// 	// 	license,
	// 	// 	userType,
	// 	// 	profilePic,
	// 	// 	__v,
	// 	// 	createdAt,
	// 	// 	updatedAt,
	// 	// 	...others
	// 	// } = userData;
	// 	alert('add to socket');
	// 	const socketData = {
	// 		_id: userData._id,
	// 		fullName: userData.fullName,
	// 		email: userData.email,
	// 	};
	// 	console.log(socket);
	// 	socket.emit('newUser', socketData);
	// };

	const fetchWorkspace = async (id) => {
		console.log('fetch workspace');
		const response = await axiosRequests.getData(
			`/workspace/get?workspaceID=${id}`
		);
		if (response) dispatch(updateWorkspace(response.data.data));
	};
	const handleGoogleSignIn = () => {
		window.location.replace(`${process.env.REACT_APP_URL}/auth/google`);
	};
	const handleSubmit = async (values, props) => {
		// console.log(value);
		// event.preventDefault();
		// const data = new FormData(event.currentTarget);
		const response = await axiosRequests.postData('/auth/local/login', {
			username: values.email,
			password: values.password,
		});
		setTimeout(() => {
			props.resetForm();
			props.setSubmitting(false);
		}, 2000);
		console.log(response.data);
		if (response.data.message === 'success') {
			if (response.data.data.defaultWorkspace)
				fetchWorkspace(response.data.data.defaultWorkspace);
			dispatch(updateUser(response.data.data));
			// addNewUserSocket(response.data.data);
			// newSocketConnection(response.data.data);

			if (response.data.data.defaultWorkspace) navigate('/dashboard');
			else navigate('/workspace');
		}
	};
	const { user: User } = useSelector((state) => state);
	useEffect(() => {
		if (!User?.email) {
			document.title = 'PlanBow - Login';
		}
		// else {
		// 	navigate('/dashboard');
		// }
	}, []);

	const initialValues = {
		email: '',
		password: '',
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Enter valid email').required('Required'),
		password: Yup.string()
			.min(6, 'Password minimum length should be 6')
			.required('Required'),
	});

	// const onSubmit = (values, props) => {
	// 	console.log(values);
	// 	console.log(props);
	// 	setTimeout(() => {
	// 		props.resetForm();
	// 		props.setSubmitting(false);
	// 	}, 2000);
	// };

	return (
		<Container maxWidth='xs' sx={{ ...whiteBoxCenter }}>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					// alignItems: 'center',
				}}
			>
				<Grid>
					<Grid
						sx={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'center',
							pb: 2,
						}}
					>
						{/* <Avatar src={ICONS.logoBrandRound} sx={{ m: 1, bgcolor: 'primery.main' }}></Avatar> */}
						<img src={ICONS.logoBrandRound} alt='Logo' />
					</Grid>
					<Grid>
						<Typography component='h2' variant='mainTitle'>
							{labels['component.login.label.sign-in-title']}
						</Typography>
						<Typography component='p' variant='subContent'>
							{labels['component.login.label.sign-in-subtext']}
						</Typography>
					</Grid>
				</Grid>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						m: '10px 0',
					}}
				>
					<Stack direction='row' spacing={2} sx={{ ...socialIcon }}>
						<Button
							variant='outlined'
							onClick={handleGoogleSignIn}
							startIcon={
								<Icon
									path={mdiGoogle}
									color='#4285f4'
									title='Google'
									size={1}
								/>
							}
						>
							Google
						</Button>
						<Button
							variant='outlined'
							startIcon={
								<Icon
									path={mdiFacebook}
									color='#4867aa'
									title='Facebook'
									size={1}
								/>
							}
						>
							Facebook
						</Button>
					</Stack>
				</Box>
				<Divider>OR</Divider>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<Field
								as={TextField}
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								size='small'
								helperText={<ErrorMessage name='email' />}
							/>
							<Field
								as={TextField}
								margin='normal'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								size='small'
								helperText={<ErrorMessage name='password' />}
							/>
							{/* <FormControlLabel
								control={
									<Field as={Checkbox} value='remember' color='primary' />
								}
								label='Remember me'
							/> */}
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								{labels['component.login.label.sign-in']}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link
										onClick={() => navigate('/forgot-password')}
										variant='body2'
										sx={{ cursor: 'pointer' }}
									>
										{labels['component.login.label.forgot-password']}
									</Link>
								</Grid>
								<Grid item>
									<Link
										variant='body2'
										onClick={(e) => {
											e.stopPropagation();
											e.nativeEvent.stopImmediatePropagation();
											setOnboardNav('registration');
										}}
										sx={{ cursor: 'pointer' }}
									>
										Don&rsquo;t have an account? Sign Up
									</Link>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Box>
			{/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
		</Container>
	);
}

Login.propTypes = {
	setOnboardNav: PropTypes.func,
	whiteBoxCenter: PropTypes.object,
	socialIcon: PropTypes.object,
	resetForm: PropTypes.object,
	setSubmitting: PropTypes.object,
};
