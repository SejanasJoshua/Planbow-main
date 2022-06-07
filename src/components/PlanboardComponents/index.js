import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import PlanboardCanvas from '@components/PlanboardCanvas';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	updateURLHistory,
	updatePlanboard,
	// planboardComponentsModal,
} from '@redux/actions';

export default function PlanboardComponents({ planboards }) {
	// let { setselectedNav } = props;
	const [view, setView] = useState('Grid');
	const [open, setOpen] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [openIdeation, setOpenIdeation] = React.useState(false);
	const [planboardID, setPlanboardID] = React.useState();
	const [deleteSuccess, setDeleteSuccess] = React.useState(1);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// const ideationClickOpen = () => {
	// 	setOpenIdeation(true);
	// 	setOpen(false);
	// };

	const handleDelete = async () => {
		try {
			const response = await axios.put(
				`${process.env.REACT_APP_URL}/planboard/delete`,
				{
					deletePlanboardID: planboardID,
				}
			);
			if (response.data.data === 'success') {
				setOpenDialog(false);
				setDeleteSuccess(deleteSuccess + 1);
				// alertMessage('Delete Successfull', 'success');
				alert('Delete Successfull');
			} else {
				// alertMessage('Delete Failed!', 'error');
				alert('Delete Failed');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEdit = (planboard) => {
		dispatch(updateURLHistory('/dashboard'));
		dispatch(updatePlanboard(planboard));
		navigate('/ideation');
	};

	const handleDeleteOpen = (id) => {
		setPlanboardID(id);
		setOpenDialog(true);
	};

	const handleDeleteClose = () => {
		setPlanboardID(null);
		setOpenDialog(false);
	};

	const ideation = () => {
		navigate('/ideation', { state: { id: 1, name: 'sabaoon' } });
	};

	// const ideationhandleClose = () => {
	// 	setOpenIdeation(false);
	// };
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
						onClick={handleClickOpen}
						variant='contained'
						size='small'
						sx={{ ml: 2 }}
					>
						Create Planboard
					</Button>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Subscribe</DialogTitle>
						<DialogContent>
							<DialogContentText>
								To subscribe to this website, please enter your email address
								here. We will send updates occasionally.
							</DialogContentText>
							<TextField
								autoFocus
								margin='dense'
								id='name'
								label='Email Address'
								type='email'
								fullWidth
								variant='standard'
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							{/* <Button onClick={ideationClickOpen}>Subscribe</Button> */}
							<Button
								onClick={() => {
									ideation();
								}}
							>
								Subscribe
							</Button>
						</DialogActions>
					</Dialog>
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
				<Grid>
					{openIdeation === true && (
						<PlanboardCanvas
							openIdeation={openIdeation}
							setOpenIdeation={setOpenIdeation}
						/>
					)}
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
	planboards: PropTypes.array,
};
