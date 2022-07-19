import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Icon from '@mdi/react';
import { mdiFullscreen } from '@mdi/js';
import YourIdea from './YourIdea';
import IdeaFlowPlaceholder from './IdeaFlowPlaceholder';
import { useSelector } from 'react-redux';
import axiosRequests from '@utils/axiosRequests';
import PlanboardDesignerContext from '@contexts/planboardDesigner';

const drawerWidth = {
	'& .MuiDrawer-paper': {
		width: { md: '80%', xs: '100%' },
	},
};

export default function IdeationFlow() {
	const selectedComponent = useSelector(
		(state) => state.settings.planboardComponent
	);
	const [ideaNav, SetideaNav] = React.useState('youridea');
	const [currentselect, Setcurrentselect] = React.useState();
	const [selectedIdea, setSelectedIdea] = React.useState();
	const [ideas, setIdeas] = React.useState([]);

	const { contextState, setContextState } = useContext(
		PlanboardDesignerContext
	);

	const toggleDrawerClose = () => {
		setContextState((prev) => ({
			...prev,
			rightDrawer: false,
		}));
	};

	const deleteIdea = async () => {
		try {
			const response = await axiosRequests.deleteData(
				'/componentIdeas/delete',
				{
					data: {
						idea_id: currentselect.id,
					},
				}
			);
			if (response.data.message === 'success') {
				const newIdeas = [...ideas];
				newIdeas.splice(
					newIdeas.findIndex((value) => value.id === currentselect.id),
					1
				);
				setIdeas(newIdeas);
				SetideaNav('youridea');
			} else {
				console.log('error');
			}
		} catch (e) {
			console.log(e);
		}
	};
	// React.useEffect(() => {
	// 	console.log('Ideation Flow');
	// }, []);

	return (
		<div>
			<Drawer
				anchor='right'
				sx={{ ...drawerWidth }}
				open={contextState.rightDrawer}
				onClose={toggleDrawerClose}
			>
				<Box sx={{ flexGrow: 1 }}>
					<AppBar position='static'>
						<Toolbar variant='dense'>
							<Stack
								direction='row'
								spacing={2}
								sx={{ flexGrow: 1, alignItems: 'center' }}
							>
								<Avatar alt='Ideation' sx={{ width: 24, height: 24 }} />
								<Typography variant='h6' component='div'>
									{selectedComponent?.data?.label ?? ''}
								</Typography>
								<Typography variant='body' component='div'>
									Due on : 10th May, 2022
								</Typography>
								<Grid
									sx={{
										display: 'flex',
										alignItems: 'center',
										backgroundColor: (theme) => theme.palette.secondary.main,
										borderRadius: 4,
										p: 0.5,
									}}
								>
									<Avatar alt='Ideation' sx={{ width: 24, height: 24 }} />
									<Avatar alt='Ideation' sx={{ width: 24, height: 24 }} />
									<Avatar alt='Ideation' sx={{ width: 24, height: 24 }} />
								</Grid>
							</Stack>

							<IconButton edge='start' color='inherit' aria-label='full screen'>
								<Icon path={mdiFullscreen} title='Full screen' size={1} />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Grid sx={{ p: 2 }}>
						{ideaNav == 'youridea' ? (
							<YourIdea
								SetideaNav={SetideaNav}
								Setcurrentselect={Setcurrentselect}
								setSelectedIdea={setSelectedIdea}
								ideas={ideas}
								setIdeas={setIdeas}
							/>
						) : ideaNav == 'ideaplaceholder' ? (
							<IdeaFlowPlaceholder
								SetideaNav={SetideaNav}
								currentselect={currentselect}
								selectedIdea={selectedIdea}
								ideaNav={ideaNav}
								deleteIdea={deleteIdea}
							/>
						) : null}
						{/* {ideaNav == 'youridea' ? (
							<YourIdea SetideaNav={SetideaNav} />
						) : ideaNav == 'ideaplaceholder' ? (
							<IdeaFlowPlaceholder SetideaNav={SetideaNav} ideaNav={ideaNav} />
						) : ideaNav == 'capture' ? (
							<IdeaCapture SetideaNav={SetideaNav} ideaNav={ideaNav} />
						) : ideaNav == 'validate' ? (
							<IdeaValidate />
						) : ideaNav == 'finalize' ? (
							<IdeaFinalize />
						) : null} */}
					</Grid>
				</Box>
			</Drawer>
		</div>
	);
}

// IdeationFlow.propTypes = {
// 	// toggleDrawerOpen: PropTypes.func,
// 	toggleDrawerClose: PropTypes.func,
// 	ideaDrawer: PropTypes.bool,
// };
