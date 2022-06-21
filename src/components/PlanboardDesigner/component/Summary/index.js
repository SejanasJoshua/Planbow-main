import React from 'react';
import IdeationFlow from '../IdeationFlow';
import PropTypes from 'prop-types';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import {  Grid } from '@mui/material';
export default function IdeationSummary(props) {
	return (
		<>
			<IdeationFlow />
		
				<Grid sx={{ flexGrow: 1 }} container spacing={3}
				direction='column'
				justifyContent='space-around'
				style={{marginTop:20}}
				>
					<Grid item md={12}>
						<LeftPanel {...props} />
					</Grid>
					{/* <Grid item md={12} style={{width:'40%',height:'20%'}}> */}
						<RightPanel {...props} />
					{/* </Grid> */}
				</Grid>
			
		</>
	);
}
IdeationSummary.propTypes = {
	creator: PropTypes.object,
};
