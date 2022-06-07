import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';
import IdeationHeader from './component/IdeationHeader';
import IdeationTab from './component/IdeationTab';
import IdeationCanvas from './component/IdeationCanvas';
import IdeationSummary from './component/IdeationSummary';
import IdeationEvents from './component/IdeationEvents';
import IdeationActionItems from './component/IdeationActionItems';
import IdeaContent from './component/IdeaContent';
import IdeaActivity from './component/IdeaActivity';
import IdeaAIInsights from './component/IdeaAIInsights';

export default function Ideation() {
	// const theme = useTheme();
	const [selectedNav, setselectedNav] = React.useState('ideasummary');
	return (
		<Container maxWidth='xl'>
			<Box sx={{ margin: '0 -24px' }}>
				<IdeationHeader />
			</Box>
			<Box
				sx={{
					margin: '0 -24px',
					px: '24px',
					height: '40px',
					backgroundColor: (theme) => theme.palette.secondary.main,
				}}
			>
				<IdeationTab selectedNav={selectedNav} setselectedNav={setselectedNav} />
			</Box>
			<Box
				sx={{
					flexDirection: 'column',
					display: 'flex',
					flexGrow: 1,
					height: 'calc(100vh - 88px)',
					width: '100%',
				}}
			>
				{selectedNav == 'ideasummary' ? (
					<IdeationSummary />
				) : selectedNav == 'ideacanvas' ? (
					<IdeationCanvas />
				) : selectedNav == 'ideaactionitem' ? (
					<IdeationActionItems />
				) : selectedNav == 'ideaevent' ? (
					<IdeationEvents />
				) : selectedNav == 'ideacontent' ? (
					<IdeaContent />
				) : selectedNav == 'ideaactivity' ? (
					<IdeaActivity />
				) : selectedNav == 'ideainsights' ? (
					<IdeaAIInsights />
				) : null}
			</Box>
		</Container>
	);
}
