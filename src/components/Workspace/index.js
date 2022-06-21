import React, { useEffect, useState, useTransition } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import axiosRequests from '@utils/axiosRequests';
import labels from '@shared/labels';
import gotoRouter from '@utils/GlobelFunction';
import { Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateWorkspace } from '@redux/actions';

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

export default function Workspace() {
	const [isPending, startTransition] = useTransition();
	const [workspace, setWorkspace] = useState('');
	const [error, setError] = useState(null);
	const [isValid, setIsValid] = useState(false);

	const { user: userRedux } = useSelector((state) => state);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const dashboardPage = () => {
		// navigate('/dashboard');
	};

	const handleChange = (value) => {
		setWorkspace(value);
		if (value.length < 4) {
			setError('Company Name Should be atleast 4 characters long.');
			return setIsValid(false);
		} else setError(null);
		return setIsValid(true);
	};
	const updateUserDefaultWorkspace = async (workspaceID) => {
		try {
			await axiosRequests.putData('/user', {
				userID: userRedux._id,
				workspaceID,
			});
		} catch (e) {
			console.log(e);
		}
	};
	const checkDuplicateWorkspace = async () => {
		try {
			const response = await axiosRequests.getData(
				`/workspace/get?workspace=${workspace}`
			);
			if (response.data.message === 'conflict') {
				setError('Workspace Already Exists!');
			}
		} catch (e) {
			console.log(e);
		}
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.currentTarget);
	// 	console.log({
	// 		email: data.get('email'),
	// 		password: data.get('password'),
	// 	});
	// };
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axiosRequests.postData('/workspace/create', {
			name: workspace,
			createdBy: userRedux._id,
		});
		if (response.data.message === 'success') {
			updateUserDefaultWorkspace(response.data.data._id);
			dispatch(updateWorkspace(response.data.data));
			<Alert severity='success'>Workspace created successfull</Alert>;
			navigate('/invite');
		}
	};
	useEffect(() => {
		if (workspace.length >= 4) checkDuplicateWorkspace();
	}, [workspace]);
	useEffect(() => {
		document.title = 'PlanBow - Create WorkSpace';
	}, []);
	return (
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
					{labels['component.login.label.workspace']}
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						name='workspace'
						id='workspace'
						label='Workspace Name'
						autoComplete='workspace'
						autoFocus
						onChange={(e) => handleChange(e.target.value)}
						error={!!error}
						helperText={error}
					/>
					<TextField
						margin='normal'
						fullWidth
						name='password'
						id='password'
						label='Workspace URL'
						autoComplete='current-password'
						value={workspace + '.planbow.com'}
						variant='outlined'
						disabled
						// InputProps={{
						// 	endAdornment: (
						// 		<InputAdornment position='end'>.planbow.com</InputAdornment>
						// 	),
						// }}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						disabled={!isValid}
						sx={{ mt: 3, mb: 2 }}
					>
						Create Workspace
					</Button>
					{isPending ? ' Loading...' : null}
				</Box>
			</Box>
			<Copyright sx={{ mt: 8, mb: 4 }} />
		</Container>
	);
}
