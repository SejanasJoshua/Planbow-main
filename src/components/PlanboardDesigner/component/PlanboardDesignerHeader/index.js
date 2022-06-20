import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiHelpCircleOutline, mdiArrowLeft } from '@mdi/js';
import { useSelector } from 'react-redux';
import axiosRequests from '@utils/axiosRequests';
import { Popover } from '@mui/material';
import NotificationPopup from '@components/Notification/NotificationPopup';

export default function PlanboardDesignerHeader() {
	const navigate = useNavigate();
	const [notifications, setNotifications] = React.useState([]);

	const toComponentB = () => {
		navigate('/dashboard');
	};
	const { planboard, user } = useSelector((state) => state);
	const [popoverAnchor, setPopoverAnchor] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setPopoverAnchor(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setPopoverAnchor(null);
	};

	const openPopover = Boolean(popoverAnchor);
	const popoverID = open ? 'simple-popover' : undefined;

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
	React.useEffect(() => {
		if (user !== 'no-data') getNotifications();
	}, [user]);

	return (
		<AppBar position='static'>
			<Toolbar variant='dense'>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
					onClick={() => {
						toComponentB();
					}}
				>
					<Icon path={mdiArrowLeft} title='Home' size={1} />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					{planboard?.name}
				</Typography>

				<IconButton color='inherit' onClick={handlePopoverOpen}>
					<Badge badgeContent={4} color='secondary'>
						<Icon path={mdiBellOutline} title='Home' size={1} />
					</Badge>
				</IconButton>
				<IconButton color='inherit'>
					<Icon path={mdiHelpCircleOutline} title='Home' size={1} />
				</IconButton>
			</Toolbar>
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
		</AppBar>
	);
}
