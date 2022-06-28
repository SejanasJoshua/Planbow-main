/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

const ideationTab = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
};

const tabData = [
	{
		text: 'Summary',
		route: 'ideasummary',
	},
	{
		text: 'Canvas',
		route: 'ideacanvas',
	},
	{
		text: 'Action Items',
		route: 'ideaactionitem',
	},
	{
		text: 'Events',
		route: 'ideaevent',
	},
	{
		text: 'Content',
		route: 'ideacontent',
	},
	{
		text: 'Activity',
		route: 'ideaactivity',
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
									mx: '10px',
									ml: 0,
									fontSize: '14px',
									borderBottom: '3px solid',
									cursor: 'pointer',
							  }
							: {
									mx: '10px',
									ml: 0,
									fontSize: '14px',
									pb: '3px',
									cursor: location?.state?.newPlanboard?'no-drop':location?.state?.editable ? 'pointer' : 'no-drop',
									pointerEvents: location?.state?.newPlanboard?'none':location?.state?.editable ? 'auto' : 'none',
							  }
					}
					key={index}
					item
					onClick={() => setselectedNav(data.route)}
				>
					{data.text}
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
