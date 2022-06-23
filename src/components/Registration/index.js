import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import axiosRequests from '@utils/axiosRequests';

import Icon from '@mdi/react';
import { mdiFacebook, mdiGoogle } from '@mdi/js';

import labels from '@shared/labels';
import { ICONS } from '@shared/assets';

export default function Registration({
	setOnboardNav,
	whiteBoxCenter,
	socialIcon,
}) {
	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		// event.preventDefault();
		const data = new FormData(event.currentTarget);
		const response = await axiosRequests.postData('/auth/local/register', {
			fullName: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
		});
		console.log(response.data);
		if (response.data.message === 'success') {
			// if (response.data.data.defaultWorkspace)
			// 	fetchWorkspace(response.data.data.defaultWorkspace);
			// dispatch(updateUser(response.data.data));
			// newSocketConnection(response.data.data);

			navigate('/login');
		}
	};
	return (
		<Container fixed>
			<Box sx={{ height: '100vh' }}>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid item xs={6}>
						<Box sx={{ width: '100%', maxWidth: 500, mt: 8 }}>
							<Typography variant='h6' gutterBottom component='div'>
								h6. Heading
							</Typography>
							<Typography variant='subtitle1' gutterBottom component='div'>
								subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing
								elit. Quos blanditiis tenetur
							</Typography>
							<Typography variant='subtitle2' gutterBottom component='div'>
								subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing
								elit. Quos blanditiis tenetur
							</Typography>
							<Typography variant='body1' gutterBottom>
								body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Quos blanditiis tenetur unde suscipit, quam beatae rerum
								inventore consectetur, neque doloribus, cupiditate numquam
								dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
							</Typography>
							<Typography variant='body2' gutterBottom>
								body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
								Quos blanditiis tenetur unde suscipit, quam beatae rerum
								inventore consectetur, neque doloribus, cupiditate numquam
								dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
							</Typography>
							<Typography variant='button' display='block' gutterBottom>
								button text
							</Typography>
							<Typography variant='caption' display='block' gutterBottom>
								caption text
							</Typography>
							<Typography variant='overline' display='block' gutterBottom>
								overline text
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Container
							maxWidth='xs'
							sx={{
								...whiteBoxCenter,
								position: 'relative',
								top: 30,
								left: 0,
								transform: 'inherit',
							}}
						>
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
											{labels['component.login.label.account-title']}
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
								<Box
									component='form'
									onSubmit={handleSubmit}
									noValidate
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='name'
										label='Name'
										name='name'
										autoComplete='name'
										autoFocus
										size='small'
									/>
									<TextField
										margin='normal'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										size='small'
										// autoFocus
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

									<TextField
										margin='normal'
										required
										fullWidth
										name='confirmpassword'
										label='Confirm Password'
										type='password'
										id='confirmpassword'
										autoComplete='current-password'
										size='small'
									/>
									<FormControlLabel
										control={<Checkbox value='remember' color='primary' />}
										label='I read and accept terms and conditions'
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
										// onClick={(e) => {
										// 	e.stopPropagation();
										// 	e.nativeEvent.stopImmediatePropagation();
										// 	setOnboardNav('workspace');
										// }}
									>
										Create an Planbow account
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
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

Registration.propTypes = {
	setOnboardNav: PropTypes.func,
	whiteBoxCenter: PropTypes.object,
	socialIcon: PropTypes.object,
};
