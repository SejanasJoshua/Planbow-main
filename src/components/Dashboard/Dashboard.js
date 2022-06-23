import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './listItems';
import labels from '@shared/labels';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiHelpCircleOutline } from '@mdi/js';

import { ICONS } from '@shared/assets';
import HomeComponent from '@components/HomeComponent';
import PlanboardComponents from '@components/PlanboardComponents';
import PlanboardCanvas from '@components/PlanboardCanvas';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SidePanel from './SidePanel';
import // updateURLHistory,
// updatePlanboard,
// planboardComponentsModal,
'@redux/actions';
import { addActionItems }  from '@redux/actions';
// import axios from 'axios';
import axiosRequests from '@utils/axiosRequests';
import { Popover } from '@mui/material';
import NotificationPopup from '../Notification/NotificationPopup';

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	'& .MuiDrawer-paper': {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: 'border-box',
		...(!open && {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

function DashboardContent() {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const [selectedNav, setselectedNav] = React.useState('home');
	const [notifications, setNotifications] = React.useState([]);
	const [planboards, setPlanboards] = React.useState([]);
	const user = useSelector((state) => state.user);
	const workspace = useSelector((state) => state.workspace);
	// const dispatch = useDispatch();

	const toggleDrawer = () => {
		setOpen(!open);
	};

	console.log(notifications);
	const getNotifications = async () => {
		console.log('Fetching Notifications...');

		try {
			const response = await axiosRequests.getData(
				`/notification/get?userID=${user._id}&email=${user.email}`
			);
			if (response.data.message === 'error') {
				console.log('no notifications');
			} else {
				setNotifications(response.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getPlanboards = async () => {
		console.log('Fetching Planboards...');

		try {
			const response = await axiosRequests.getData(
				`/planboard/get?workspace=${workspace._id}`
			);
			if (response.data.data === 'No-Data') {
				// alertMessage('No Planboards!', 'warning');
				console.log('no planboards');
			} else {
				setPlanboards(response.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const [popoverAnchor, setPopoverAnchor] = React.useState(null);
	const [sidePanel, setSidePanel] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setPopoverAnchor(event.currentTarget);
	};


	const handlePopoverClose = () => {
		setPopoverAnchor(null);
	};
	const handleSidePanelOpen = (event) => {
		setSidePanel(event.currentTarget);
	};


	const handleSidePanelClose = () => {
		setSidePanel(null);
	};

	const openPopover = Boolean(popoverAnchor);
	const popoverID = open ? 'simple-popover' : undefined;

	// const newPlanboard = async () => {
	// 	let value = '00001';
	// 	planboards.map((item) => {
	// 		if (item.name.substring(0, 5) == 'demo_') {
	// 			let itemValue = parseInt(item.name.substring(5, 10), 10);
	// 			if (itemValue >= parseInt(value, 10))
	// 				value = (itemValue + 1).toString(10);
	// 		}
	// 	});
	// 	while (value.length <= 4) {
	// 		value = '0' + value;
	// 	}
	// 	console.log('demo_' + value);
	// 	try {
	// 		const response = await axios.post(
	// 			`${process.env.REACT_APP_URL}/planboard/create`,
	// 			{
	// 				name: 'demo_' + value,
	// 				workspace: workspace._id,
	// 				user: user._id,
	// 				description: '',
	// 				users: '',
	// 				coCreators: '',
	// 				notificationTypes: '',
	// 				endDate: new Date(),
	// 			}
	// 		);
	// 		if (response.data.message === 'conflict') {
	// 			// alertMessage(
	// 			// 	`Looks Like You Already have a Planboard in this Workspace.`,
	// 			// 	'warning'
	// 			// );
	// 			alert('Looks Like You Already have a Planboard in this Workspace.');
	// 			getPlanboards();
	// 		} else {
	// 			// alertMessage('demo_' + value, 'success');
	// 			alert('demo_' + value);
	// 			dispatch(updatePlanboard(response.data.data));
	// 			dispatch(updateURLHistory('/dashboard'));
	// 			navigate('/ideation');
	// 		}
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	// const handlePlanbowComponentsinAction = () => {
	// 	dispatch(planboardComponentsModal(true));
	// 	newPlanboard();
	// };

	React.useEffect(() => {
		console.log('home');
		document.title = 'PlanBow - Home';
		if (user === 'no-data') navigate('/');
	}, []);

	React.useEffect(() => {
		if (workspace !== 'no-data') getPlanboards();
	}, [workspace]);

	React.useEffect(() => {
		if (user !== 'no-data') getNotifications();
	}, [user]);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='absolute'
				color='transparent'
				sx={{
					boxShadow: 'none',
				}}
				open={open}
			>
				<Toolbar
					variant='dense'
					sx={{
						pr: '24px', // keep right padding when drawer closed
					}}
				>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={toggleDrawer}
						sx={{
							marginRight: '36px',
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component='div'
						variant='div'
						color='inherit'
						noWrap
						sx={{ flexGrow: 1 }}
					>
						{labels['component.home.label.welcome']} {user?.fullName}
					</Typography>
					<IconButton
						color='inherit'
						onClick={handlePopoverOpen}
						aria-describedby={popoverID}
					>
						<Badge badgeContent={4} color='secondary'>
							<Icon path={mdiBellOutline} title='Notification' size={1} />
						</Badge>
					</IconButton>
					<IconButton color='inherit'
					onClick={handleSidePanelOpen}
					aria-describedby={'side-panel'}
					>
						<Icon path={mdiHelpCircleOutline} title='Home' size={1} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<Toolbar
					variant='dense'
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						px: [1],
					}}
				>
					<img
						style={{ width: '120px', marginRight: 'auto', marginTop: '10px' }}
						src={ICONS.logoBrand}
						alt='planbow'
					/>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component='nav'>
					<ListItems setselectedNav={setselectedNav} />
					{/* {mainListItems} */}
					{/* <Divider sx={{ my: 1 }} />
					{secondaryListItems} */}
				</List>
			</Drawer>
			<Box
				component='main'
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.background
							: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
					{selectedNav == 'home' ? (
						<HomeComponent planboards={planboards} />
					) : selectedNav == 'planboards' ? (
						<PlanboardComponents
							setselectedNav={setselectedNav}
							planboards={planboards}
						/>
					) : selectedNav == 'canvas' ? (
						<PlanboardCanvas />
					) : null}
					<Copyright sx={{ pt: 4 }} />
				</Container>
			</Box>
			<Popover
				id={popoverID}
				open={openPopover}
				anchorEl={popoverAnchor}
				onClose={handlePopoverClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<NotificationPopup notifications={notifications} />
			</Popover>
			<Popover
				id={'side-panel'}
				 open={Boolean(sidePanel)}
				anchorEl={sidePanel}
				 onClose={handleSidePanelClose}
				 style={{marginRight:'50px '}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<SidePanel />
			</Popover>
		</Box>
	);
}

export default function Dashboard() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		actionItemData();
	},[]);
	const actionItemData = async () => {
		const response = await axiosRequests.getData(
			'/planboardComponent/get?planboardID=624dba3e9c437cb32217cb90'
		);
		if (response?.data?.data?.length){
			dispatch(addActionItems(response?.data?.data));
		} 
	};
	return <DashboardContent />;
}
