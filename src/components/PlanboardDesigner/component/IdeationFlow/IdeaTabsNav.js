/*eslint no-mixed-spaces-and-tabs: [2, "smart-tabs"]*/
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Icon from '@mdi/react';
import {
	mdiFileOutline,
	mdiGestureTap,
	mdiSitemap,
	mdiCalendarCheck,
} from '@mdi/js';

const ideationTab = {
	display: 'flex',
	alignItems: 'center',
	height: '100%',
};

export default function IdeaTabsNav({ SetideaNavTab, ideaNavTab }) {
	const ideaTabNav = [
		{
			text: 'Capture',
			route: 'capture',
			icon: mdiFileOutline,
		},
		{
			text: 'Refine',
			route: 'refine',
			icon: mdiGestureTap,
		},
		{
			text: 'Validate',
			route: 'validate',
			icon: mdiSitemap,
		},
		{
			text: 'Finalize',
			route: 'finalize',
			icon: mdiCalendarCheck,
		},
	];
	const activeSmallTab = {
		mx: '20px',
		ml: 0,
		fontSize: '14px',
		borderBottom: '2px solid',
		cursor: 'pointer',
		display: 'flex',
		p: 0.5,
		alignItems: 'center',
	};
	const smallTab = {
		mx: '20px',
		ml: 0,
		fontSize: '14px',
		pb: '2px',
		p: 0.5,
		borderBottom: '2px solid transparent',
		alignItems: 'center',
		cursor: 'pointer',
		display: 'flex',
	};
	return (
		<Grid container sx={{ ...ideationTab }}>
			{ideaTabNav.map((data, index) => (
				<Grid
					sx={ideaNavTab == data.route ? { ...activeSmallTab } : {...smallTab}}
					key={index}
					item
					onClick={() => SetideaNavTab(data.route)}
				>
					<Icon path={data.icon} title='Summary' size={0.5} />
					<Typography sx={{ ml: '5px', fontSize: '12px' }}>
						{data.text}
					</Typography>
				</Grid>
			))}
		</Grid>
	);
}

IdeaTabsNav.propTypes = {
	SetideaNavTab: PropTypes.func,
	ideaNavTab: PropTypes.string,
};
