import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosRequests from '@utils/axiosRequests';
import {
	Backdrop,
	CircularProgress,
	Container,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
	const [state, setState] = useState({
		isValid: true,
		validatingToken: true,
		user: {},
		message: '',
		loading: false,
	});
	const [input, setInput] = useState({
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState({
		password: '',
		confirmPassword: '',
	});
	const { id, token } = useParams();
	const navigate = useNavigate();

	const validateToken = async () => {
		const response = await axiosRequests.postData('/reset-password/validate', {
			id,
			token,
		});
		setState((prev) => ({
			...prev,
			validatingToken: false,
		}));
		if (response.data.message === 'no-user') {
			setState((prev) => ({
				...prev,
				isValid: false,
				message: 'No user found',
			}));
		} else if (response.data.message === 'invalid token') {
			setState((prev) => ({
				...prev,
				isValid: false,
				message: 'Invalid Request',
			}));
		} else if (response.data.message === 'success')
			setState((prev) => ({
				...prev,
				user: response.data.data.user,
			}));
		return;
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setInput((prev) => ({
			...prev,
			[name]: value,
		}));
		validateInput(e);
	};

	const validateInput = (e) => {
		let { name, value } = e.target;
		var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{8,30}$/;
		setError((prev) => {
			const stateObj = { ...prev, [name]: '' };

			switch (name) {
				case 'password':
					if (!value) {
						stateObj[name] = 'Please enter Password.';
					} else if (input.confirmPassword && value !== input.confirmPassword) {
						stateObj['confirmPassword'] =
							'Password and Confirm Password does not match.';
					} else if (!regularExpression.test(value)) {
						stateObj[name] =
							'password should contain atleast one number and one special character and can be in the range 8-30 characters';
					} else {
						stateObj['confirmPassword'] = input.confirmPassword
							? ''
							: error.confirmPassword;
					}
					break;

				case 'confirmPassword':
					if (!value) {
						stateObj[name] = 'Please enter Confirm Password.';
					} else if (input.password && value !== input.password) {
						stateObj[name] = 'Password and Confirm Password does not match.';
					}
					break;

				default:
					break;
			}

			return stateObj;
		});
	};

	const handleSubmit = async () => {
		setState((prev) => ({
			...prev,
			loading: true,
		}));
		const response = await axiosRequests.postData('/reset-password', {
			token,
			password: input.confirmPassword,
			userID: id,
		});
		setState((prev) => ({
			...prev,
			loading: false,
		}));
		if (response.data.message === 'success') {
			alert('Password Reset Successfull');
			navigate('/');
		} else if (response.data.message === 'error')
			setState((prev) => ({
				...prev,
				isValid: false,
			}));
		else
			setState((prev) => ({
				...prev,
				isValid: false,
			}));
	};

	useEffect(() => {
		id && token && validateToken();
	}, [id, token]);
	return (
		<div>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={state.validatingToken}
			>
				Validating...
				<CircularProgress color='inherit' />
			</Backdrop>
			<Container
				component='main'
				maxWidth='xs'
				sx={{
					paddingTop: 8,
					paddingBottom: 8,
					position: 'absolute',
					top: '50%;',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				{state.isValid ? (
					<>
						<Typography variant='h5'>
							Reset Password for {state.user.fullName} ({state.user.email})
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							size='small'
							placeholder='Enter Password'
							value={input.password}
							onChange={onInputChange}
							onBlur={validateInput}
							error={error.password}
							helperText={error.password}
							autoFocus
						/>

						<TextField
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='Confirm Password'
							id='confirmpassword'
							autoComplete='current-password'
							size='small'
							placeholder='Confirm Password'
							value={input.confirmPassword}
							onChange={onInputChange}
							onBlur={validateInput}
							error={error.confirmPassword}
							helperText={error.confirmPassword}
						/>
						<LoadingButton
							type='submit'
							loading={state.loading}
							fullWidth
							variant='contained'
							disabled={error.password || error.confirmPassword}
							onClick={handleSubmit}
							sx={{ mt: 3, mb: 2 }}
						>
							Reset Password
						</LoadingButton>
					</>
				) : (
					<>
						<Typography variant='h2'>Invalid Request</Typography>
						<Link
							variant='body2'
							underline='none'
							onClick={(e) => {
								e.preventDefault();
								navigate('/');
							}}
							sx={{ cursor: 'pointer' }}
						>
							Back to Login
						</Link>
					</>
				)}
			</Container>
		</div>
	);
};

export default ResetPassword;
