import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosRequests from '@utils/axiosRequests';
import {
	Backdrop,
	CircularProgress,
	Container,
	TextField,
	Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const Step3 = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { name, id, email } = location.state;

	const [state, setState] = useState({
		isValid: false,
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
		const response = await axiosRequests.postData('/register/password', {
			id,
			password: input.confirmPassword,
		});
		if (response.data.message === 'success') {
			alert('registration Successfull');
			navigate('/');
		}
	};

	useEffect(() => {
		id &&
			name &&
			email &&
			setState((prev) => ({
				...prev,
				isValid: true,
			}));
		console.log({ id, name, email });
	}, [id, name, email]);

	return (
		<div>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={!state.isValid}
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
				<Typography variant='h5'>Enter Your Full Name {state.email}</Typography>
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
					onClick={handleSubmit}
					sx={{ mt: 3, mb: 2 }}
				>
					Next
				</LoadingButton>
			</Container>
		</div>
	);
};

export default Step3;
