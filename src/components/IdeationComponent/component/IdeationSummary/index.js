import React, { useState } from 'react';
import IdeationFlow from '../IdeationFlow';
import {
	Input,
	Typography,
	Grid,
	Select,
	MenuItem,
	InputLabel,
	OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';
export default function IdeationSummary(props) {
	const users = [
		{ id: 1, email: '1@gmail.com', name: '1John' },
		{ id: 2, email: '2@gmail.com', name: '2John' },
		{ id: 3, email: '3@gmail.com', name: '3John' },
		{ id: 4, email: '4@gmail.com', name: '4John' },
		{ id: 5, email: '5@gmail.com', name: '5John' },
	];
	const [state, setState] = useState({
		creator: props?.creator?.fullName,
		title: '',
		coCreators: [],
		startDate: '',
		endDate: '',
	});
	const checkIfUserExists = (newUser) => {
		return !state.coCreators.filter((user) => user == newUser).length;
	};
	const addUser = (selected, { props: { value } }) => {
		if (state.coCreators.length == 0 || checkIfUserExists(value)) {
			setState({ ...state, coCreators: [...state.coCreators, value] });
		}
	};
	return (
		<>
			<IdeationFlow />
			<div
				className='main-div'
				style={{ padding: '20px', margin: '50px 25px' }}
			>
				<Grid
					style={{ border: '2px 2px solid black' }}
					container
					direction='column'
					justifyContent='space-around'
					alignItems='flex-start'
				>
					<Grid item>
						<Typography variant='h5' style={{ width: '100%' }}>
							<Grid
								container
								direction='row'
								width='25rem'
								justifyContent='space-between'
								alignItems='flex-start'
							>
								<Grid item>Creator:</Grid>
								<Grid item lr={18}>
									{' '}
									{`${props?.creator?.fullName ?? ''}`}
								</Grid>
							</Grid>
						</Typography>
					</Grid>

					<Grid item>
						<Typography variant='h5' style={{ width: '100%' }}>
							<Grid
								container
								direction='row'
								width='25rem'
								justifyContent='space-between'
								alignItems='flex-start'
							>
								<Grid item>Title:</Grid>
								<Grid item lr={18}>
									<Input
										onChange={(e) =>
											setState({ ...state, title: e.target.value })
										}
									/>{' '}
								</Grid>
							</Grid>
						</Typography>
					</Grid>

					<Grid item>
						<Typography variant='h5' style={{ width: '100%' }}>
							<Grid
								container
								direction='row'
								width='25rem'
								justifyContent='space-between'
								alignItems='flex-start'
							>
								<Grid item>Add User:</Grid>
								<Grid item style={{ width: '100%' }}>
									<InputLabel id='demo-simple-select-label'>User</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={state.coCreators}
										style={{ width: '100%' }}
										multiple
										defaultValue={'User'}
										label='User'
										input={<OutlinedInput label='Name' />}
										onChange={(e, children) =>
											addUser(e.target.value, children)
										}
									>
										{[
											...users.map((user) => (
												<MenuItem key={user.id} value={user.email}>
													{user.name}
												</MenuItem>
											)),
										]}
									</Select>
								</Grid>
							</Grid>
						</Typography>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
IdeationSummary.propTypes = {
	creator: PropTypes.object,
};
