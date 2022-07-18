import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import PlanboardDesignerContext from '@contexts/planboardDesigner';
import {
	Autocomplete,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	TextField,
} from '@mui/material';
import axiosRequests from '@utils/axiosRequests';
import { useSelector } from 'react-redux';
let fetchedAssignedValues;

export default function TaskDelegation() {
	const {
		planboard,
		selectedPlanboardComponent,
		contextState,
		setContextState,
	} = useContext(PlanboardDesignerContext);

	const [state, setState] = useState({
		fetchedUsers: false,
	});

	const user = useSelector((state) => state.user);

	const [assignedUsers, setAssignedUsers] = useState([]);

	const toggleDialogClose = () => {
		setContextState((prev) => ({
			...prev,
			delegateDialog: false,
		}));
	};

	const updateAssignedUser = async () => {
		console.log('updated');
		if (selectedPlanboardComponent?.data?.componentID)
			await axiosRequests.putData('/planboardComponent/update', {
				planboardComponentID: selectedPlanboardComponent.data.componentID,
				tasksAssigned: assignedUsers,
			});
		// console.log(selectedPlanboardComponent);
	};
	const getAssignedUsers = async () => {
		const response = await axiosRequests.getData(
			`/planboardComponent/get?planboardComponentID=${selectedPlanboardComponent.data.componentID}`
		);
		console.log('fetched');
		fetchedAssignedValues = response.data.data?.tasksAssigned ?? [];
		setAssignedUsers(response.data.data?.tasksAssigned ?? []);
		// setA(10);
		setState({
			fetchedUsers: true,
		});
	};
	const handleCancel = () => {
		setAssignedUsers(fetchedAssignedValues);
		toggleDialogClose();
	};
	const addUserPlanboard = async (emails) => {
		await axiosRequests.putData('/user/', {
			assignedTasks: 'add',
			emailLists: emails,
			planboardID: planboard._id,
		});
	};
	const removeUserPlanboard = async (emails) => {
		await axiosRequests.putData('/user/', {
			assignedTasks: 'remove',
			emailLists: emails,
			planboardID: planboard._id,
		});
	};
	const closeDialog = async () => {
		updateAssignedUser();
		toggleDialogClose();
		const removed = fetchedAssignedValues?.map((x) => {
			if (!assignedUsers.includes(x)) return x;
		});
		const added = assignedUsers.filter(
			(x) => !fetchedAssignedValues.includes(x)
		);
		const removedEmailLists = removed.map((item) => {
			if (item) return item.email;
		});
		const addedEmailLists = added.map((item) => {
			if (item) return item.email;
		});
		addUserPlanboard(addedEmailLists);
		removeUserPlanboard(removedEmailLists);

		await axiosRequests.postData('/notification/create', {
			emailLists: removedEmailLists,
			senderID: user._id,
			content: `Your assigned task on ${selectedPlanboardComponent?.data?.label} component on the ${planboard?.name} planboard has been removed`,
			priority: 100,
			type: 'task',
		});
		await axiosRequests.postData('/notification/create', {
			emailLists: addedEmailLists,
			senderID: user._id,
			content: `Your have been assigned a task on ${selectedPlanboardComponent?.data?.label} component on the ${planboard?.name} planboard`,
			priority: 100,
			type: 'task',
		});

		fetchedAssignedValues = assignedUsers;
	};

	useEffect(() => {
		if (!state.fetchedUsers)
			selectedPlanboardComponent?.data?.componentID && getAssignedUsers();
	}, [selectedPlanboardComponent, state.fetchedUsers]);
	// useEffect(() => {
	// 	// planboard && console.log(planboard.users, 'users');
	// }, [planboard]);
	// useEffect(() => {
	// 	console.log(a);
	// }, [a]);
	return (
		<div>
			<Dialog onClose={closeDialog} open={contextState.delegateDialog}>
				<DialogTitle>
					Delegate Users
					<IconButton onClick={closeDialog}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ width: '500px' }}>
					<Autocomplete
						multiple
						id='tags-standard'
						options={planboard.users}
						// getOptionLabel={(option) => option.fullName}
						// getOptionLabel={(option) => option}
						value={assignedUsers}
						onChange={(event, newValue) => {
							setAssignedUsers(newValue);
						}}
						isOptionEqualToValue={(option, value) =>
							option.email === value.email
						}
						// renderOption={(props, option) => (
						// 	<Box
						// 		component='li'
						// 		sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
						// 		{...props}
						// 	>
						// 		{option.fullName} ({option.email})
						// 	</Box>
						// )}
						renderInput={(params) => (
							<TextField
								{...params}
								variant='standard'
								label='Assign Users'
								placeholder='Users'
								sx={{ width: '80%' }}
							/>
						)}
					/>
				</DialogContent>
				<DialogActions>
					<Box sx={{ alignContent: 'right', display: 'flex' }}>
						<Stack sx={{ display: 'block' }}>
							<Button variant='outlined' onClick={handleCancel}>
								Cancel
							</Button>
							<Button variant='outlined' onClick={closeDialog}>
								Done
							</Button>
						</Stack>
					</Box>
				</DialogActions>
			</Dialog>
		</div>
	);
}

TaskDelegation.propTypes = {
	// toggleDialogClose: PropTypes.func,
	// delegateDialog: PropTypes.bool,
	a: PropTypes.number,
	setA: PropTypes.func,
};
