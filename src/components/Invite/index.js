import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	// TextField,
	Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import axiosRequests from '@utils/axiosRequests';
import { useSelector } from 'react-redux';

const Invite = () => {
	// const [emailField, setEmailField] = useState('');
	const [state, setState] = useState({
		items: [],
		value: '',
		error: null,
	});
	// const [emails, setEmails] = useState([]);
	// const [value, setValue] = useState('');
	// const [error, setError] = useState(null);
	const navigate = useNavigate();

	const { user, workspace } = useSelector((state) => state);

	const handleSubmit = async () => {
		const response = await axiosRequests.postData('/invite/new', {
			email: state.items,
			from: user.id,
			workspace: workspace._id,
		});
		if (response.data.message === 'success') {
			alert('Invitation Link Sent');
			// history.push('/home');
			navigate('/dashboard');
		}
	};

	const handleKeyDown = (evt) => {
		if (['Enter', 'Tab', ','].includes(evt.key)) {
			evt.preventDefault();

			var value = state.value.trim();

			if (value && isValid(value)) {
				setState({
					items: [...state.items, state.value],
					value: '',
					error: state.error,
				});
			}
		}
	};

	const handleChange = (evt) => {
		setState({
			value: evt.target.value,
			error: null,
			items: [...state.items],
		});
	};

	const handleDelete = (item) => {
		setState({
			items: state.items.filter((i) => i !== item),
			error: state.error,
			value: state.value,
		});
	};

	const handlePaste = (evt) => {
		evt.preventDefault();

		var paste = evt.clipboardData.getData('text');
		var emails = paste.match(/[\w\d\\.-]+@[\w\d\\.-]+\.[\w\d\\.-]+/g);

		if (emails) {
			var toBeAdded = emails.filter((email) => isInList(email));

			setState({
				items: [...state.items, ...toBeAdded],
				value: state.value,
				error: state.error,
			});
		}
	};

	const isValid = (email) => {
		let error = null;
		console.log(isInList(email));

		if (isInList(email)) {
			error = `${email} has already been added.`;
		}

		if (!isEmail(email)) {
			error = `${email} is not a valid email address.`;
		}

		if (error) {
			setState({ error: error, items: state.items, value: state.value });

			return false;
		}

		return true;
	};

	const isInList = (email) => {
		return state.items.includes(email);
	};

	const isEmail = (email) => {
		return /[\w\d\\.-]+@[\w\d\\.-]+\.[\w\d\\.-]+/.test(email);
	};

	useEffect(() => {
		console.log(state);
	}, [state]);
	return (
		<div sx={{ height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '16px',
					height: '100%',
				}}
			>
				<Card
					initial={{ x: 200 }}
					animate={{ x: 0 }}
					transition={{ bounceDamping: 0 }}
					square
					layout='true'
					sx={{
						maxWidth: '600px',
						minWidth: '500px',
						marginLeft: 'auto',
						marginRight: 'auto',
						margin: '16px',
						borderRadius: '20px',
					}}
				>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							paddintTop: '0px !important',
							padding: '16px',
						}}
					>
						<div>
							<img src='./icons/logo.svg' alt='Planbow' />
						</div>
						<Typography variant='h3'>Invite your colleagues</Typography>
						<Typography variant='subtitle1'>
							The Best products are made together
						</Typography>
						{state.items?.map((item) => (
							<div
								className='tag-item'
								key={item}
								// style={{
								// 	backgroundColor: '#d4d5d6',
								// 	display: 'inline-block',
								// 	fontSize: '14px',
								// 	borderRadius: '30px',
								// 	height: '30px',
								// 	padding: '0 4px 0 1rem',
								// 	display: 'inline-flex',
								// 	alignItems: 'center',
								// 	margin: '1 0.3rem 0.3rem 0',
								// }}
							>
								{item}
								<button
									type='button'
									className='button'
									onClick={() => handleDelete(item)}
								>
									&times;
								</button>
							</div>
						))}

						<input
							className={'input ' + (state.error && ' has-error')}
							value={state.value}
							placeholder='Type or paste email addresses and press `Enter`...'
							onKeyDown={handleKeyDown}
							onChange={handleChange}
							onPaste={handlePaste}
						/>
						{state.error && <p className='error'>{state.error}</p>}
						{/* <TextField
							label='Email Addresses'
							variant='outlined'
							fullWidth
							multiline
							value={emailField}
							onChange={(e) => setEmailField(e.target.value)}
							rows={5}
							placeholder="use comma(,) to separate email ID's"
							sx={{ marginBottom: '16px' }}
						/> */}

						<Button
							variant='contained'
							color='primary'
							aria-label='LOG IN'
							onClick={handleSubmit}
							sx={{
								width: '100%',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '16px',
								borderRadius: '10px',
							}}
						>
							Continue
						</Button>

						<Button
							component={Link}
							to='/dashboard'
							variant='outlined'
							color='primary'
							aria-label='LOG IN'
							sx={{
								width: '100%',
								marginLeft: 'auto',
								marginRight: 'auto',
								marginTop: '16px',
								borderRadius: '10px',
							}}
						>
							I&lsquo;ll do it later
						</Button>
					</CardContent>
				</Card>
			</Box>
		</div>
	);
};

export default Invite;
