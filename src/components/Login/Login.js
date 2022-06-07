import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUser, updateWorkspace } from '@redux/actions';
import { useDispatch } from 'react-redux';
import { createSocket } from '../functions';

import labels from '@shared/labels';
// import gotoRouter from '@utils/GlobelFunction';

// import gotoRouter from '../../utils/GlobelFunction';

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let socket;
	const addNewUserSocket = (userData) => {
		const { _id, fullName, email, defaultWorkspace } = userData;
		socket.emit('newUser', { _id, fullName, email, defaultWorkspace });
	};

	// const handleGoogle = () => {
	// 	window.location.replace(`${process.env.REACT_APP_URL}/auth/google`);
	// };

	const fetchWorkspace = async (id) => {
		console.log('fetch workspace');
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_URL}/workspace/get?workspaceID=${id}`
			);
			if (response) dispatch(updateWorkspace(response.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	const newSocketConnection = (userData) => {
		console.log('new socket');
		socket = createSocket();
		addNewUserSocket(userData);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		try {
			const URL = `${process.env.REACT_APP_URL}/auth/local/login`;
			const response = await axios.post(URL, {
				username: data.get('email'),
				password: data.get('password'),
			});
			if (response.data.message === 'success') {
				if (response.data.data.defaultWorkspace)
					fetchWorkspace(response.data.data.defaultWorkspace);
				dispatch(updateUser(response.data.data));
				newSocketConnection(response.data.data);

				if (response.data.data.defaultWorkspace) navigate('/dashboard');
				else navigate('/dashboard');
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		document.title = 'PlanBow - Login';
	}, []);

	return (
		<Container
			component='main'
			maxWidth='xs'
			sx={{
				// background: (theme) => `${theme.palette.secondary.main}`,
				// border: (theme) =>`1px solid ${theme.palette.amber.main}`,
				paddingTop: 8,
				paddingBottom: 8,
				position: 'absolute',
				top: '50%;',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{labels['component.login.label.sign-in']}
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
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
							<Link href='#' variant='body2'>
								{labels['component.login.label.forgot-password']}
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								Don&rsquo;t have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
