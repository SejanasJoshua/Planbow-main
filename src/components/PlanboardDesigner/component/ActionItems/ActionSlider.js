import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

export default function ActionSlider() {
	return (
		<Box sx={{ maxWidth: 200, display: 'flex', alignItems: 'center' }}>
			<LinearProgress
				sx={{ height: '10px', flexGrow: '1' }}
				variant='determinate'
				value={50}
			/>
			<Typography sx={{ ml: 1 }} variant='body2' color='text.secondary'>
				50%
			</Typography>
		</Box>
	);
}
