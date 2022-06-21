import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';
import PlanboardDesignerHeader from './component/PlanboardDesignerHeader';
import PlanboardDesignerTab from './component/PlanboardDesignerTab';
import Canvas from './component/Canvas';
import Summary from './component/Summary';
import Events from './component/Events';
import ActionItems from './component/ActionItems';
import Content from './component/Content';
import Activity from './component/Activity';
import PlanboardDesignerContext from '@contexts/planboardDesigner';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export default function PlanboardDesigner() {
	// const theme = useTheme();
	// const [selectedNav, setselectedNav] = React.useState('ideasummary');
	const location=useLocation();
	const { selectedNav, setselectedNav, setPlanboard,actionItem:actionItemData } = useContext(
		PlanboardDesignerContext
	);
	const { planboard: planboardRedux, user: User } = useSelector(
		(state) => state
	);
	
	useEffect(() => {
		planboardRedux && setPlanboard(planboardRedux);
	}, []);

	return (
		<Container maxWidth='xl'>
			<Box sx={{ margin: '0 -24px' }}>
				<PlanboardDesignerHeader />
			</Box>
			<Box
				sx={{
					margin: '0 -24px',
					px: '24px',
					height: '40px',
					backgroundColor: (theme) => theme.palette.secondary.main,
				}}
			>
				<PlanboardDesignerTab
					selectedNav={selectedNav}
					setselectedNav={setselectedNav}
				/>
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
					<Summary creator={User} Planboard={planboardRedux} location={location} />
				) : selectedNav == 'ideacanvas' ? (
					<Canvas />
				) : selectedNav == 'ideaactionitem' ? (
					<ActionItems  actionItemData={actionItemData}/>
				) : selectedNav == 'ideaevent' ? (
					<Events />
				) : selectedNav == 'ideacontent' ? (
					<Content />
				) : selectedNav == 'ideaactivity' ? (
					<Activity />
				) : null}
			</Box>
		</Container>
	);
}
