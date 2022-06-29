/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Icon from '@mdi/react';
import {
	mdiFileChartOutline,
	mdiGestureTap,
	mdiSitemap,
	mdiCalendarCheck,
	mdiContentPaste,
	mdiChartTimelineVariant,
} from '@mdi/js';
import { Typography } from '@mui/material';

const ideationTab = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
};

const tabData = [
	{
		text: 'Summary',
		route: 'ideasummary',
		icon: mdiFileChartOutline,
	},
	{
		text: 'Canvas',
		route: 'ideacanvas',
		icon: mdiGestureTap,
	},
	{
		text: 'Action Items',
		route: 'ideaactionitem',
		icon: mdiSitemap,
	},
	{
		text: 'Events',
		route: 'ideaevent',
		icon: mdiCalendarCheck,
	},
	{
		text: 'Content',
		route: 'ideacontent',
		icon: mdiContentPaste,
	},
	{
		text: 'Activity',
		route: 'ideaactivity',
		icon: mdiChartTimelineVariant,
	},
];

export default function PlanboardDesignerTab({
	setselectedNav,
	selectedNav,
	location,
}) {
	return (
		<Grid container sx={{ ...ideationTab }}>
			{tabData.map((data, index) => (
				<Grid
					sx={
						selectedNav == data.route
							? {
									mx: '20px',
									ml: 0,
									fontSize: '14px',
									borderBottom: '3px solid',
									cursor: 'pointer',
									display: 'flex',
							  }
							: {
									mx: '20px',
									ml: 0,
									fontSize: '14px',
									pb: '3px',
									cursor: location?.state?.newPlanboard
										? 'no-drop'
										: location?.state?.editable
										? 'pointer'
										: 'no-drop',
									pointerEvents: location?.state?.newPlanboard
										? 'none'
										: location?.state?.editable
										? 'auto'
										: 'none',
									// cursor: location?.state?.editable ? 'no-drop' : 'pointer',
									// pointerEvents: location?.state?.editable ? 'none' : 'auto',
									display: 'flex',
							  }
					}
					key={index}
					item
					onClick={() => setselectedNav(data.route)}
				>
					<Icon path={data.icon} title='Summary' size={0.9} />
					<Typography sx={{ ml: '5px' }}>{data.text}</Typography>
				</Grid>
			))}
		</Grid>
	);
}

PlanboardDesignerTab.propTypes = {
	setselectedNav: PropTypes.func,
	selectedNav: PropTypes.string,
	location: PropTypes.object,
};
