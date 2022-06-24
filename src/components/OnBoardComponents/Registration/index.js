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
	const navigate = useNavigate();

	const [input, setInput] = React.useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = React.useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		terms: '',
	});

	const [isChecked, setIsChecked] = React.useState(false);

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
				case 'username':
					if (!value) {
						stateObj[name] = 'Please enter your Name.';
					} else if (value.length < 4) {
						stateObj[name] = 'Please enter a valid Username.';
					}
					break;
				case 'email':
					if (!value) {
						stateObj[name] = 'Please enter your EmailId.';
					}
					break;
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
		const response = await axiosRequests.postData('/auth/local/register', {
			fullName: input.username,
			email: input.email,
			password: input.confirmPassword,
		});
		console.log(response.data);
		if (response.data.message === 'success') {
			navigate('/');
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
									// noValidate
									sx={{ mt: 1 }}
								>
									<TextField
										margin='normal'
										required
										fullWidth
										id='username'
										label='Name'
										name='username'
										autoComplete='name'
										autoFocus
										size='small'
										placeholder='Enter Full Name'
										value={input.username}
										onChange={onInputChange}
										onBlur={validateInput}
										error={error.username}
										helperText={error.username}
									/>
									<TextField
										margin='normal'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										type='email'
										size='small'
										placeholder='Enter Email Id'
										value={input.email}
										onChange={onInputChange}
										onBlur={validateInput}
										error={error.email}
										helperText={error.email}
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
										placeholder='Enter Password'
										value={input.password}
										onChange={onInputChange}
										onBlur={validateInput}
										error={error.password}
										helperText={error.password}
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
									<FormControlLabel
										control={
											<Checkbox
												name='terms'
												value={isChecked}
												onChange={() => setIsChecked(!isChecked)}
												color='primary'
											/>
										}
										label='I read and accept terms and conditions'
									/>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}
										disabled={
											error.username ||
											error.email ||
											error.password ||
											error.confirmPassword ||
											!isChecked
										}
									>
										Create an Planbow account
									</Button>
									<Grid container>
										<Grid item xs />
										<Grid item>
											<Link
												variant='body2'
												onClick={(e) => {
													e.stopPropagation();
													e.nativeEvent.stopImmediatePropagation();
													setOnboardNav('login');
												}}
												sx={{ cursor: 'pointer' }}
											>
												Have an account? Sign In
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
