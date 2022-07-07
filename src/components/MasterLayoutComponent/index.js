import * as React from 'react';
import PropTypes from 'prop-types';
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
import { Badge, Container } from '@mui/material';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItems from './listItems';
import labels from '@shared/labels';
import axiosRequests from '@utils/axiosRequests';
import { Popover } from '@mui/material';
import { useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiAccountCircle } from '@mdi/js';

import NotificationPopup from '@components/Notification/NotificationPopup';
import SidePanel from './SidePanel';

import { ICONS } from '@shared/assets';

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

export default function MasterLayoutComponent(props) {
	const user = useSelector((state) => state.user);
	const [open, setOpen] = React.useState(true);
	const [notifications, setNotifications] = React.useState([]);
	const toggleDrawer = () => {
		setOpen(!open);
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

	const getNotifications = async () => {
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

	React.useEffect(() => {
		if (user !== 'no-data') getNotifications();
	}, [user]);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='absolute' open={open}>
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
					<IconButton
						color='inherit'
						onClick={handleSidePanelOpen}
						aria-describedby={'side-panel'}
					>
						<Icon path={mdiAccountCircle} title='Home' size={1} />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<Toolbar
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
					<ListItems />
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
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
					{props.children}
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
				style={{ marginRight: '50px ' }}
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

MasterLayoutComponent.propTypes = {
	children: PropTypes.object,
};
