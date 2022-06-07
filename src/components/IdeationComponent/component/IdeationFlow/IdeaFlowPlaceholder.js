import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IdeaTabsNav from './IdeaTabsNav';
import IdeaCapture from './IdeaCapture';
import IdeaValidate from './IdeaValidate';
import IdeaFinalize from './IdeaFinalize';
import IdeaRefine from './IdeaRefine';

export default function IdeaFlowPlaceholder({ SetideaNav, currentselect }) {
	const [ideaNavTab, SetideaNavTab] = React.useState('capture');
	return (
		<>
			<Box>
				<Grid onClick={() => SetideaNav('youridea')}>
					back {currentselect.name}
				</Grid>
				<Grid>
					<IdeaTabsNav SetideaNavTab={SetideaNavTab} ideaNavTab={ideaNavTab} />
				</Grid>
				<Grid>
					{ideaNavTab == 'capture' ? (
						<IdeaCapture
							SetideaNavTab={SetideaNavTab}
							ideaNavTab={ideaNavTab}
						/>
					) : ideaNavTab == 'refine' ? (
						<IdeaRefine />
					) : ideaNavTab == 'validate' ? (
						<IdeaValidate />
					) : ideaNavTab == 'finalize' ? (
						<IdeaFinalize />
					) : null}
					{/* <IdeaCapture /> */}
				</Grid>
			</Box>
		</>
	);
}

IdeaFlowPlaceholder.propTypes = {
	SetideaNav: PropTypes.func,
	currentselect: PropTypes.string,
};
