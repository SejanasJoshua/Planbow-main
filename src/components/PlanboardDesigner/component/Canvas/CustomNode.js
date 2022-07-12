import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Handle } from 'react-flow-renderer';
import Icon from '@mdi/react';
import {
	mdiDotsVertical,
	mdiLockOpenOutline,
	mdiLockOutline,
	mdiMessageOutline,
	mdiCalendarMonthOutline,
	mdiEyeOutline,
	mdiAccountMultiplePlus,
	mdiPlusCircle,
} from '@mdi/js';
import './customNode.css';
import { planboardComponentsModal } from '@redux/actions';
import axiosRequests from '@utils/axiosRequests';

import IdeationFlow from '../IdeationFlow';
// import AllComponentsList from './AllComponentsList';
import { useDispatch } from 'react-redux';
import TaskDelegation from './components/TaskDelegation.js';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === 'light' ? '#6fe65a' : '#6fe65a',
	},
}));

export default function CustomNode(props) {
	const [states, setStates] = useState({
		lock: true,
		createdBy: '',
	});
	const [ideaDrawer, setideaDrawer] = useState(false);
	const [delegateDialog, setDelegateDialog] = useState(false);
	const [a, setA] = useState(0);

	const dispatch = useDispatch();
	// const [components, setComponents] = React.useState(false);
	const componentsClickOpen = () => {
		// setComponents(true);
		dispatch(planboardComponentsModal(true));
	};
	// const componentsClose = () => {
	// 	// setComponents(false);
	// 	dispatch(planboardComponentsModal(false));
	// };
	const [nodeName, setNodeName] = useState(props.data.label);
	const [anchorEl, setAnchorEl] = useState(null);
	const menuOpen = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const deleteNode = () => {
		handleClose();
		setNodeName(`${nodeName}s`);
		props.data.delete = true;
	};

	const toggleDrawerOpen = () => {
		setideaDrawer(true);
		setA(0);
	};

	const toggleDrawerClose = () => {
		setideaDrawer(false);
	};

	const toggleDialogOpen = () => {
		setDelegateDialog(true);
	};
	const toggleDialogClose = () => {
		setDelegateDialog(false);
	};

	const getUserName = async () => {
		const response = await axiosRequests.getData(
			`/user?id=${props.data.createdBy}`
		);
		if (response.data.message === 'success') {
			setStates((prev) => ({
				...prev,
				createdBy: response.data.data,
			}));
		}
	};
	useEffect(() => {
		getUserName();
	}, [props.data.createdBy]);
	return (
		<>
			<Handle type='target' position='left' style={{ background: '#555',padding:8,margin:-13 }} />
			<Grid container>
				<Card
					className='node-card'
					sx={{ background: '#f7f699', width: '230px', height: '200px' }}
				>
					<CardHeader
						// avatar={<img src={ICONS.customNode} alt='icon name' />}
						action={
							<IconButton
								id='demo-positioned-button'
								aria-controls={menuOpen ? 'demo-positioned-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={menuOpen ? 'true' : undefined}
								onClick={handleClick}
								aria-label='settings'
							>
								<Icon
									path={mdiDotsVertical}
									title='Home'
									size={1}
									className='node-hide'
								/>
							</IconButton>
						}
						title={
							<>
								<Box sx={{ display: 'flex' }}>
									<Typography
										sx={{ fontWeight: 'bold', fontSize: '16px' }}
										variant='h5'
										component='span'
									>
										{props.data.label}
									</Typography>
									<img
										style={{ paddingLeft: '10px' }}
										src={props.data.icon}
										alt={nodeName}
									/>
								</Box>
							</>
						}
						// avatar={<img src={props.data.icon} alt={nodeName} />}
					/>
					<CardContent className='flex' sx={{ py: 0 }}>
						<Grid container>
							<Grid
								item
								sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
							>
								<BorderLinearProgress
									variant='determinate'
									value={50}
									sx={{ width: '95%', marginRight: '10px' }}
								/>
								50%
							</Grid>
							<Grid item>
								<Typography
									sx={{ fontSize: '14px' }}
									variant='span'
									component='span'
								>
									35 Attributes
								</Typography>
							</Grid>
						</Grid>
						<IconButton
							aria-haspopup='true'
							aria-label='settings'
							sx={{
								right: '-50px',
								top: '50%',
								transform: 'translateY(-50%)',
								position: 'absolute',
							}}
							onClick={componentsClickOpen}
						>
							<Icon path={mdiPlusCircle} title='Add' size={1} />
						</IconButton>
						<Box className='node-hide'>
							<IconButton
								aria-label='lock'
								onClick={() => setStates({ ...states, lock: !states.lock })}
							>
								{states.lock ? (
									<Icon path={mdiLockOpenOutline} title='lock open' size={1} />
								) : (
									<Icon path={mdiLockOutline} title='lock close' size={1} />
								)}
							</IconButton>
							<IconButton aria-label='chat'>
								<Icon path={mdiMessageOutline} title='lock close' size={1} />
							</IconButton>
							<IconButton aria-label='chat'>
								<Icon
									path={mdiCalendarMonthOutline}
									title='lock close'
									size={1}
								/>
							</IconButton>
							<IconButton aria-label='lock' onClick={toggleDrawerOpen}>
								<Icon path={mdiEyeOutline} title='lock close' size={1} />
							</IconButton>
							<IconButton aria-label='chat' onClick={toggleDialogOpen}>
								<Icon path={mdiAccountMultiplePlus} title='Account' size={1} />
							</IconButton>
						</Box>
					</CardContent>

					<CardActions sx={{ bottom: '0', position: 'absolute' }}>
						<Grid container>
							<Grid item>{states.createdBy}</Grid>
						</Grid>
					</CardActions>
				</Card>
			</Grid>
			<Handle
				type='source'
				position='right'
				style={{ background: '#555',padding:8,margin:-13 }}
				// isConnectable={isConnectable}
			/>
			<IdeationFlow
				ideaDrawer={ideaDrawer}
				toggleDrawerClose={toggleDrawerClose}
			/>
			<TaskDelegation
				delegateDialog={delegateDialog}
				toggleDialogClose={toggleDialogClose}
				a={a}
				setA={setA}
			/>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
			>
				<MenuItem>Edit</MenuItem>
				<MenuItem onClick={deleteNode}>Delete</MenuItem>
				{/* <MenuItem onClick={data.nodeDelete}>Delete</MenuItem> */}
			</Menu>
		</>
	);
}
CustomNode.propTypes = {
	data: PropTypes.object,
};
