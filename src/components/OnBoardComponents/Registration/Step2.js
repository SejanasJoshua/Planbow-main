import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Step2 = () => {
	const navigate = useNavigate();

	const { id, token } = useParams();
	const [state, setState] = useState({
		isValid: true,
		validatingToken: true,
		message: '',
		loading: false,
		email: '',
	});
	const [name, setName] = useState('');

	const handleSubmit = async () => {
		const response = await axiosRequests.postData('/register/name', {
			id,
			name,
		});
		if (response.data.message === 'success') {
			navigate('/register/step-3', { state: { name, id, email: state.email } });
		}
	};

	const onNameChange = (e) => {
		setName(e.target.value);
	};
	const validateToken = async () => {
		const response = await axiosRequests.postData('/register/verify-email', {
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
				message: 'Invalid Token',
			}));
		} else if (response.data.message === 'success') {
			setState((prev) => ({
				...prev,
				email: response.data.email,
			}));
		}
		return;
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
							Enter Your Full Name {state.email}
						</Typography>
						<TextField
							margin='normal'
							required
							fullWidth
							name='name'
							label='Full Name'
							id='name'
							size='small'
							placeholder='Enter Full Name'
							value={name}
							onChange={onNameChange}
							autoFocus
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
					</>
				) : (
					<>
						<Typography variant='h2'>Link Expired</Typography>
						<Typography variant='h6'>{state.message}</Typography>
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

export default Step2;
