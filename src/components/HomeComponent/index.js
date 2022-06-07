import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
import MyPlanboards from './MyPlanboards';
import PropTypes from 'prop-types';
// import PlanboardComponents from '../PlanboardComponents';
import PlanboardGridView from '@components/PlanboardComponents/PlanboardGridView';

import labels from '@shared/labels';

export default function HomeComponent({ planboards }) {
	return (
		<Grid container spacing={3}>
			{/* Chart */}
			<Grid item xs={12} md={12} lg={12}>
				<MyPlanboards planboards={planboards} />
			</Grid>
			{/* Recent Deposits */}
			<Grid item xs={12} md={12} lg={12}>
				<Grid>
					<Typography variant='h2' component='h2'>
						{labels['component.home.label.title-planningcomponents']}
					</Typography>
				</Grid>
				<PlanboardGridView />
			</Grid>
			{/* Recent Orders */}
			<Grid item xs={12}>
				{/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
        </Paper> */}
			</Grid>
		</Grid>
	);
}

HomeComponent.propTypes = {
	planboards: PropTypes.array,
};
