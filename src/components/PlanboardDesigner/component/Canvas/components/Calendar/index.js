import React, { useState } from 'react';
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

const Calendar = ({ calendarDialog, toggleDialogClose, data }) => {
	const [state, setState] = useState({
		startDate: data.startDate || new Date(),
		endDate: data.endDate || new Date(),
	});
	const { startDate, endDate } = state;
	const handleConfirm = () => {
		data.startDate = startDate;
		data.endDate = endDate;
		toggleDialogClose();
	};

	return (
		<div>
			<Dialog onClose={toggleDialogClose} open={calendarDialog}>
				<DialogTitle>
					Add Start/End Date
					<IconButton onClick={toggleDialogClose}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ width: '500px' }}>
					<Grid container>
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
	toggleDialogClose: PropTypes.func,
	calendarDialog: PropTypes.bool,
	data: PropTypes.object,
};
