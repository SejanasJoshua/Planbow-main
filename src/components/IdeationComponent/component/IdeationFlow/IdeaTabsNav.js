import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';

const ideationTab = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
};


export default function IdeaTabsNav({SetideaNavTab, ideaNavTab}) {
	const ideaTabNav = [
		{
			text: 'Capture',
			route: 'capture',
		},
		{
			text: 'Refine',
			route: 'refine',
		},
		{
			text: 'Validate',
			route: 'validate',
		},
		{
			text: 'Finalize',
			route: 'finalize',
		},
	];
	return (
		<Grid container sx={{ ...ideationTab }}>
			{ideaTabNav.map((data, index) => (
				<Grid
					sx={
						ideaNavTab == data.route
							? { mx: '10px', ml: 0, fontSize: '14px', border: '2px solid' }
							: { mx: '10px', ml: 0, fontSize: '14px' }
					}
					key={index}
					item
					onClick={() => SetideaNavTab(data.route)}
				>
					{data.text}
				</Grid>
			))}
		</Grid>
	);
}

IdeaTabsNav.propTypes = {
	SetideaNavTab: PropTypes.func,
	ideaNavTab: PropTypes.string,
};
