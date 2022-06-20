import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle } from '@mdi/js';
import { updateUser, updateWorkspace } from '@redux/actions';
import { useDispatch } from 'react-redux';
import axiosRequests from '@utils/axiosRequests';
import Divider from '@mui/material/Divider';

import labels from '@shared/labels';
import { ICONS } from '@shared/assets';

export default function Login({ setOnboardNav, whiteBoxCenter, socialIcon }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const fetchWorkspace = async (id) => {
		console.log('fetch workspace');
		const response = await axiosRequests.getData(
			`/workspace/get?workspaceID=${id}`
		);
		if (response) dispatch(updateWorkspace(response.data.data));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const response = await axiosRequests.postData('/auth/local/login', {
			username: data.get('email'),
			password: data.get('password'),
		});
		console.log(response.data);
		if (response.data.message === 'success') {
			if (response.data.data.defaultWorkspace)
				fetchWorkspace(response.data.data.defaultWorkspace);
			dispatch(updateUser(response.data.data));
			// newSocketConnection(response.data.data);

			if (response.data.data.defaultWorkspace) navigate('/dashboard');
			else navigate('/dashboard');
		}
	};

	useEffect(() => {
		document.title = 'PlanBow - Login';
	}, []);

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
						size='small'
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
						size='small'
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
							<Link
								href='#'
								variant='body2'
								onClick={(e) => {
									e.stopPropagation();
									e.nativeEvent.stopImmediatePropagation();
									setOnboardNav('registration');
								}}
							>
								Don&rsquo;t have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
			{/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
		</Container>
	);
}

Login.propTypes = {
	setOnboardNav: PropTypes.func,
	whiteBoxCenter: PropTypes.object,
	socialIcon: PropTypes.object,
};
