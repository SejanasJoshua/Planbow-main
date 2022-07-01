import React, { useEffect, useState, forwardRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/RestoreFromTrash';
import axiosRequests from '@utils/axiosRequests';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Slide,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const RecycleBin = () => {
	const workspaceRedux = useSelector((state) => state.workspace);
	const [planboards, setPlanboards] = useState([]);
	const [dataChange, setDataChange] = useState(1);
	const [dialog, setDialog] = useState({
		isOpened: false,
		head: null,
		body: null,
		planboardID: null,
		state: null,
	});

	const handleClose = () => {
		setDialog({
			isOpened: false,
			head: null,
			body: null,
			planboardID: null,
			state: null,
		});
	};
	const handleConfirm = () => {
		try {
			if (dialog.state === 'bin') {
				emptyBin();
			}
			if (dialog.state === 'restore') {
				restoreData();
			}
			if (dialog.state === 'delete') {
				deleteData();
			}
		} catch (e) {
			setDialog({
				isOpened: false,
				head: null,
				body: null,
				planboardID: null,
				state: null,
			});
			alertMessage('Technical Error! Please try again later.', 'error');
			console.log(e);
		}
	};
	const handleEmptyBin = () => {
		setDialog({
			isOpened: true,
			head: 'Are you sure you want to delete all the contents from the Recycle Bin?',
			body: 'This action is irreversible. If you proceed, all data will be permanently lost.',
			planboardID: null,
			state: 'bin',
		});
	};
	const handleRestore = (id) => {
		setDialog({
			isOpened: true,
			head: 'Are you sure you want to restore this Planboard?',
			body: 'Please visit the Planboard Page to access the restored Planboard.',
			planboardID: id,
			state: 'restore',
		});
	};
	const handleDelete = (id) => {
		setDialog({
			isOpened: true,
			head: 'Are you sure you want to permanently delete this Planboard?',
			body: 'This action is irreversible. If you proceed, all data related to this planboard will be permanently lost.',
			planboardID: id,
			state: 'delete',
		});
	};
	const emptyBin = async () => {
		const response = await axiosRequests.deleteData('/planboard/deleteAll', {
			data: {
				workspace: workspaceRedux._id,
			},
		});
		setDialog({
			isOpened: false,
			head: null,
			body: null,
			planboardID: null,
			state: null,
		});
		if (response.data.message === 'success') {
			setDataChange(dataChange + 1);
			// const alertMessage = (response.data.data.deletedCount = 1)
			//   ? "Deleted 1 Record."
			//   : `Deleted ${response.data.data.deletedCount} Records.`;
			alertMessage(' Your Recycle Bin is now Empty.', 'success');
		} else {
			alertMessage('Action Failed!', 'error');
		}
	};
	const restoreData = async () => {
		const response = await axiosRequests.putData('/planboard/update', {
			restorePlanboardID: dialog.planboardID,
		});
		setDialog({
			isOpened: false,
			head: null,
			body: null,
			planboardID: null,
			state: null,
		});
		if (response.data.message === 'success') {
			setDataChange(dataChange + 1);
			alertMessage('Restore Successfull', 'success');
		} else {
			alertMessage('Restore Failed!', 'error');
		}
	};

	const deleteData = async () => {
		const response = await axiosRequests.deleteData('/planboard/delete', {
			data: {
				binDeletePlanboardID: dialog.planboardID,
			},
		});
		setDialog({
			isOpened: false,
			head: null,
			body: null,
			planboardID: null,
			state: null,
		});
		if (response.data.message === 'success') {
			setDataChange(dataChange + 1);
			alertMessage('Planboard is permanently deleted.', 'success');
		} else {
			alertMessage('Delete Failed!', 'error');
		}
	};

	const alertMessage = (message, variant) => {
		alert(message, variant);
	};

	const getPlanboards = async () => {
		try {
			const response = await axiosRequests.getData(
				`/planboard/get/bin?workspace=${workspaceRedux._id}`
			);
			if (response.data.data === 'No-Data') {
				alertMessage('Recycle Bin is Empty.', 'info');
			} else {
				setPlanboards(response.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	};
	// useEffect(() => {
	//   setWorkspace(workspaceRedux._id);
	// }, [workspaceRedux]);
	useEffect(() => {
		getPlanboards();
	}, [dataChange]);
	useEffect(() => {
		document.title = 'PlanBow - Planboard';
	}, []);
	return (
		<div className='h-full'>
			<div className='flex flex-col flex-auto items-center justify-center p-16 sm:p-32 h-full'>
				<div className='flex flex-col items-center w-full h-full'>
					<div className='flex flex-row w-full' sx={{ flexGrow: 1 }}>
						<Typography
							variant='h3'
							className='mb-24 font-semibold text-2xl sm:text-4xl flex text-center'
							sx={{ flexGrow: 1 }}
						>
							Recycle Bin
						</Typography>
						{planboards && (
							<Button
								variant='contained'
								className='my-12'
								onClick={handleEmptyBin}
							>
								Empty Bin
							</Button>
						)}
					</div>
					{planboards === [] ? (
						<Typography
							variant='h3'
							className='mb-24 font-semibold text-lg italic sm:text-2xl flex text-center'
							sx={{ flexGrow: 1 }}
						>
							No records found
						</Typography>
					) : (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label='simple table'>
								<TableHead style={{ backgroundColor: 'gray' }}>
									<TableRow>
										<TableCell align='center' style={{ fontStyle: 'italic' }}>
											Planboard Name
										</TableCell>
										<TableCell align='center' style={{ fontStyle: 'italic' }}>
											End Date
										</TableCell>
										<TableCell align='center' style={{ fontStyle: 'italic' }}>
											Deleted On
										</TableCell>
										<TableCell align='center' style={{ fontStyle: 'italic' }}>
											Author
										</TableCell>
										<TableCell align='center' style={{ fontStyle: 'italic' }}>
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{planboards.map((row) => (
										<TableRow
											key={row._id}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
											}}
										>
											<TableCell component='th' scope='row'>
												{row.name}
											</TableCell>
											<TableCell align='right'>
												{new Date(row.endDate).toDateString()}
											</TableCell>
											<TableCell align='right'>
												{new Date(row.updatedAt).toDateString()}
											</TableCell>
											<TableCell align='right'>{row.user}</TableCell>
											<TableCell align='right'>
												<Stack direction='row' spacing={1}>
													<Button
														variant='text'
														startIcon={<RestoreIcon />}
														onClick={() => handleRestore(row._id)}
													>
														Restore
													</Button>
													<Button
														variant='text'
														endIcon={<DeleteIcon />}
														onClick={() => handleDelete(row._id)}
													>
														Delete
													</Button>
												</Stack>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
					<Dialog
						open={dialog.isOpened}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-describedby='alert-dialog-slide-description'
					>
						<DialogTitle>{dialog.head}</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-slide-description'>
								{dialog.body}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button onClick={handleConfirm}>Confirm</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default RecycleBin;
