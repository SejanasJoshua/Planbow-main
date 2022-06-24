import { LoadingButton } from '@mui/lab';
import { Container, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import axiosRequests from '@utils/axiosRequests';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [loading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [error, setError] = React.useState({
		error: false,
		text: '',
	});
	const navigate = useNavigate();

	const handleSubmit = async () => {
		setLoading(true);
		const response = await axiosRequests.postData('/forgot-password', {
			email: email,
		});
		setLoading(false);
		if (response.data.message === 'no-user') {
			setError({
				error: true,
				text: 'This email Id is not registered with Planbow',
			});
			return;
		} else if (response.data.message === 'google') {
			setError({
				error: true,
				text: 'This email Id is registered with Google. Sign In using Google.',
			});
			return;
		} else if (response.data.message === 'email sent') {
			setError({
				error: false,
				text: '',
			});
			alert('The reset link has been sent to your mail id');
			navigate('/');
			return;
		}
	};

	return (
		<div>
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
				<Typography variant='h4'>
					The reset link will be sent on your registered email address
				</Typography>
				<TextField
					label='Email Address'
					required
					placeholder='Enter your registered Email Address'
					fullWidth
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						setError({ error: false });
					}}
					sx={{ mt: 3, mb: 2 }}
					error={error.error}
					helperText={error.text}
					autoFocus
				/>
				<LoadingButton
					type='submit'
					loading={loading}
					fullWidth
					variant='contained'
					onClick={handleSubmit}
					sx={{ mt: 3, mb: 2 }}
				>
					Send Reset Link
				</LoadingButton>
				<Link
					variant='body2'
					onClick={() => navigate('/')}
					sx={{ cursor: 'pointer' }}
				>
					Login
				</Link>
			</Container>
		</div>
	);
};

export default ForgotPassword;
