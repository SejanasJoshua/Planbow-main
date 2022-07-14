/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Icon from '@mdi/react';
import {
	mdiFileOutline ,
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
		icon: mdiFileOutline ,
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
									borderBottom: '2px solid',
									cursor: 'pointer',
									display: 'flex',
									p:1,
									alignItems: 'center',
							  }
							: {
									mx: '20px',
									ml: 0,
									fontSize: '14px',
									pb: '2px',
									p:1,
									borderBottom: '2px solid transparent' ,
									alignItems: 'center',
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
					<Icon path={data.icon} title='Summary' size={0.5} />
					<Typography sx={{ ml: '5px', fontSize:'12px' }}>{data.text}</Typography>
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
