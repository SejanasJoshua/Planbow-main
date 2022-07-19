import React from 'react';
// import IdeationFlow from '../IdeationFlow';
import PropTypes from 'prop-types';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { Box, Grid, Paper } from '@mui/material';
export default function IdeationSummary(props) {
	return (
		<>
			{/* <IdeationFlow /> */}

			<Box sx={{ flexGrow: 1, mt: 2 }}>
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					<Grid item xs={12} sm={6} md={6}>
						<Paper elevation={1} sx={{ p: 2 }}>
							<LeftPanel {...props} />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Paper elevation={1} sx={{ p: 2 }}>
							<RightPanel {...props} />
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
IdeationSummary.propTypes = {
	creator: PropTypes.object,
};
