import React, { useContext, useState, useEffect } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Stack,
	TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PlanboardDesignerContext from '@contexts/planboardDesigner';

const Calendar = ({ data }) => {
	const { contextState, setContextState } = useContext(
		PlanboardDesignerContext
	);

	const { currentNode, setNodes } = data;

	const [state, setState] = useState({
		startDate: currentNode.startDate || new Date(),
		endDate: currentNode.endDate || new Date(),
	});
	console.log(currentNode?.startDate ?? 'newDate');

	const { startDate, endDate } = state;

	const toggleDialogClose = () => {
		setContextState((prev) => ({
			...prev,
			calendarDialog: false,
		}));
	};

	const handleConfirm = () => {
		toggleDialogClose();
		setNodes((prev) => {
			const remaining = prev.filter((item) => item.id != currentNode.id);
			const newNodes = [...remaining, { ...currentNode, startDate, endDate }];
			return newNodes;
		});
	};

	// useEffect(() => {
	// 	currentNode?.startNode &&
	// 		setState({
	// 			startDate: new Date(currentNode.startDate),
	// 			endDate: new Date(currentNode.endDate),
	// 		});
	// }, [currentNode]);
	useEffect(() => {
		console.log({ startDate, endDate });
	}, [state.startDate]);

	return (
		<div>
			<Dialog onClose={toggleDialogClose} open={contextState.calendarDialog}>
				<DialogTitle>
					Add Start/End Date
					<IconButton onClick={toggleDialogClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ width: '500px' }}>
					<Grid container>
						<Grid item>Start Date:{currentNode?.startDate ?? 'no date'}</Grid>
						<Grid item>End Date:{currentNode?.endDate ?? 'no date'}</Grid>
						<Grid item>Start Date:</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									disablePast
									label='Start Date'
									inputFormat='dd/MM/yyyy'
									openTo='year'
									views={['year', 'month', 'day']}
									value={startDate}
									onChange={(value) =>
										//setDate(value, keyboardInputValue, 'startDate')
										setState((prev) => ({ ...prev, startDate: value }))
									}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item>End Date:</Grid>
						<Grid item xs={12}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									disablePast
									label='End Date'
									inputFormat='dd/MM/yyyy'
									openTo='year'
									views={['year', 'month', 'day']}
									value={endDate}
									onChange={(value) =>
										//setDate(value, keyboardInputValue, 'endDate')
										setState((prev) => ({ ...prev, endDate: value }))
									}
									renderInput={(params) => <TextField {...params} />}
									minDate={startDate}
								/>
							</LocalizationProvider>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Box sx={{ alignContent: 'right', display: 'flex' }}>
						<Stack sx={{ display: 'block' }}>
							<Button variant='outlined' onClick={toggleDialogClose}>
								Cancel
							</Button>
							<Button variant='outlined' onClick={handleConfirm}>
								Confirm
							</Button>
						</Stack>
					</Box>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Calendar;

Calendar.propTypes = {
	data: PropTypes.object,
};
