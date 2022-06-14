import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import PlanboardDesignerContext from '@contexts/planboardDesigner';
import { v4 as uuidv4 } from 'uuid';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import axiosRequests from '@utils/axiosRequests';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

export default function TaskDelegation({ delegateDialog, toggleDialogClose }) {
	const { planboard, selectedPlanboardComponent } = useContext(
		PlanboardDesignerContext
	);
	const userRedux = useSelector((state) => state.user);
	const [assignedUsers, setAssignedUsers] = useState([]);

	// const addAssignUsers = (user) => {
	// 	console.log(user);
	// 	console.log('addAssignUser');
	// 	setAssignedUsers([
	// 		...assignedUsers,
	// 		{
	// 			type: user.type,
	// 			assignedBy: {
	// 				email: userRedux?.email ?? 'abcd',
	// 				fullName: userRedux?.fullName ?? 'efgh',
	// 			},
	// 			assignedTo: {
	// 				email: user.email,
	// 				fullName: user.fullName,
	// 			},
	// 		},
	// 	]);
	// };
	const adduser = () => {
		console.log('first');
	};

	const removeAssignUsers = () => {};
	const updateAssignedUser = async () => {
		await axiosRequests.putData('/planboardComponent/update', {
			_id: selectedPlanboardComponent.data.componentID,
			tasksAssigned: assignedUsers,
		});
	};
	const getAssignedUsers = async () => {
		const response = await axiosRequests.getData(
			`/planboardComponent/get?planboardComponentID=${selectedPlanboardComponent.data.componentID}`
		);
		if (response?.data?.data?.tasksAssigned)
			setAssignedUsers(response.data.data.tasksAssigned);
	};
	useEffect(() => {
		selectedPlanboardComponent && getAssignedUsers();
	}, [selectedPlanboardComponent]);
	useEffect(() => {
		updateAssignedUser;
		console.log(assignedUsers);
	}, [assignedUsers]);
	// useEffect(() => {
	// 	console.log('TaskDelegation');
	// }, []);
	return (
		<div>
			<Dialog
				onClose={toggleDialogClose}
				open={delegateDialog}
				sx={{ width: '80%', height: '100%' }}
			>
				<DialogTitle>
					Delegate Users
					<IconButton onClick={toggleDialogClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ width: '80%', height: '100%' }}>
					<>
						<TableContainer>
							{/* <Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>User Name</TableCell>
										<TableCell>User Email</TableCell>
										<TableCell>Assigned By</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{assignedUsers.map((row) => (
										<TableRow
											key={uuidv4()}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell>{row?.type ?? ''}</TableCell>
											<TableCell>{row?.assignedTo.fullName ?? ''}</TableCell>
											<TableCell>{row?.assignedTo.email ?? ''}</TableCell>
											<TableCell>{row?.assignedBy.email ?? ''}</TableCell>
											<TableCell>
												<Button
													variant='outlined'
													onClick={() => removeAssignUsers(row)}
												>
													Remove
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table> */}
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>User Name</TableCell>
										<TableCell>User Email</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{planboard.users.map((row) => (
										<TableRow
											key={uuidv4()}
											sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										>
											<TableCell>{row?.type ?? ''}</TableCell>
											<TableCell>{row?.fullName ?? ''}</TableCell>
											<TableCell>{row?.email ?? ''}</TableCell>
											<TableCell>
												<Stack direction='row' spacing={1}>
													<Button
														variant='text'
														startIcon={<EditIcon />}
														onClick={() => adduser(row)}
													>
														Edit
													</Button>
													<Button onClick={adduser}>Assign</Button>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				</DialogContent>
			</Dialog>
		</div>
	);
}

TaskDelegation.propTypes = {
	toggleDialogClose: PropTypes.func,
	delegateDialog: PropTypes.bool,
};
