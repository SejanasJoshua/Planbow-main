import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ComponentDetails(props) {
	return (
		<Box sx={{ width: '100%', maxWidth: 500 }}>
			<Typography variant='h6' component='div'>
				{props.selectedComponent.name}
			</Typography>
			<Typography variant='subtitle1' component='div'>
				subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Quos blanditiis tenetur
			</Typography>
			<Typography variant='subtitle2' component='div'>
				subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				Quos blanditiis tenetur
			</Typography>
			<Typography variant='body1'>
				body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
				blanditiis tenetur unde suscipit, quam beatae rerum inventore
				consectetur, neque doloribus, cupiditate numquam dignissimos laborum
				fugiat deleniti? Eum quasi quidem quibusdam.
			</Typography>
			<Typography variant='body2'>
				body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
				blanditiis tenetur unde suscipit, quam beatae rerum inventore
				consectetur, neque doloribus, cupiditate numquam dignissimos laborum
				fugiat deleniti? Eum quasi quidem quibusdam.
			</Typography>
			<Typography variant='button' display='block'>
				button text
			</Typography>
			<Typography variant='caption' display='block'>
				caption text
			</Typography>
			<Typography variant='overline' display='block'>
				overline text
			</Typography>
		</Box>
	);
}
ComponentDetails.propTypes = {
	selectedComponent: PropTypes.object,
};
