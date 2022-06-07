import React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import labels from '@shared/labels';
import MuiAppBar from '@mui/material/AppBar';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiHelpCircleOutline } from '@mdi/js';



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
export default function Header() {
	return (
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
					// onClick={toggleDrawer}
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
					{labels['component.home.label.welcome']} UserName
				</Typography>
				<IconButton color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<Icon path={mdiBellOutline} title='Home' size={1} />
					</Badge>
				</IconButton>
				<IconButton color='inherit'>
					<Icon path={mdiHelpCircleOutline} title='Home' size={1} />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
