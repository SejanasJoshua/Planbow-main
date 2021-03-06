import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mdi/react';
import { mdiFormatListBulleted, mdiGridLarge } from '@mdi/js';
import labels from '@shared/labels';
import PlanboardGridView from './PlanboardGridView';
import PlanboardListView from './PlanboardListView';
import axios from 'axios';
import axiosRequests from '@utils/axiosRequests';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateURLHistory,
	updatePlanboard,
	updateTotalPlanboard,
} from '@redux/actions';

export default function PlanboardComponents() {
	const [view, setView] = useState('Grid');
	const [openDialog, setOpenDialog] = React.useState(false);
	const [planboardID, setPlanboardID] = React.useState();
	const [deleteSuccess, setDeleteSuccess] = React.useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, totalPlanboards: planboards } = useSelector((state) => state);
	const [assignedTasks, setAssignedTasks] = React.useState(null);

	const handleCreatePlanboard = () => {
		dispatch(updateURLHistory('/planboard'));
		navigate('/planboard-designer', {
			state: { editable: true, newPlanboard: true },
		});
	};

	const handleDelete = async () => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_URL}/planboard/update`,
				{
					deletePlanboardID: planboardID,
				}
			);
			if (response.data.message === 'success') {
				setOpenDialog(false);
				setDeleteSuccess(deleteSuccess + 1);
				const newPlanboard = planboards.filter(
					(item) => item._id !== planboardID
				);
				dispatch(updateTotalPlanboard(newPlanboard));
				alert('Delete Successfull');
			} else {
				alert('Delete Failed');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEdit = (planboard) => {
		dispatch(updateURLHistory('/planboard'));
		dispatch(updatePlanboard(planboard));
		navigate('/planboard-designer', { state: { editable: true, planboard } });
	};

	const handleDeleteOpen = (id) => {
		setPlanboardID(id);
		setOpenDialog(true);
	};

	const handleDeleteClose = () => {
		setPlanboardID(null);
		setOpenDialog(false);
	};

	const fetchUserData = async () => {
		const response = await axiosRequests.getData(
			`/user?assignedTasks=true&id=${user._id}`
		);
		setAssignedTasks(response.data.data);
	};

	useEffect(() => {
		user && fetchUserData();
	}, [user]);
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Grid
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Typography variant='h2' component='h2'>
						{labels['component.home.label.title-planningcomponents']}
					</Typography>
					<Button
						// onClick={() => setselectedNav('canvas')}
						onClick={handleCreatePlanboard}
						variant='contained'
						size='small'
						sx={{ ml: 2 }}
					>
						Create Planboard
					</Button>
					<Grid
						sx={{
							ml: 'auto',
						}}
					>
						<Stack direction='row' spacing={2}>
							<IconButton
								edge='end'
								aria-label='List View'
								onClick={() => setView('List')}
							>
								<Icon path={mdiFormatListBulleted} title='List View' size={1} />
							</IconButton>
							<IconButton
								edge='end'
								aria-label='Grid View'
								onClick={() => setView('Grid')}
							>
								<Icon path={mdiGridLarge} title='Grid View' size={1} />
							</IconButton>
						</Stack>
					</Grid>
				</Grid>
				{view === 'Grid' && (
					<PlanboardGridView
						planboards={planboards}
						handleDeleteOpen={handleDeleteOpen}
						handleEdit={handleEdit}
					/>
				)}
				{view === 'List' && (
					<PlanboardListView
						planboards={planboards}
						handleDeleteOpen={handleDeleteOpen}
						handleEdit={handleEdit}
						assignedTasks={assignedTasks}
					/>
				)}
			</Grid>
			<Dialog
				open={openDialog}
				keepMounted
				onClose={handleDeleteClose}
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle>
					Are you sure you want to delete this Planboard?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						You can restore the Planboard from Recycle Bin.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteClose}>Cancel</Button>
					<Button onClick={handleDelete}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}

PlanboardComponents.propTypes = {
	setselectedNav: PropTypes.func,
};
