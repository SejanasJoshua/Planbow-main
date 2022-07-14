import * as React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// // import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
import Icon from '@mdi/react';
import {
	mdiHomeVariantOutline,
	mdiClipboardOutline,
	mdiAccountMultiplePlusOutline,
	mdiDeleteOutline,
} from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
// import gotoRouter from '@utils/GlobelFunction';

export default function ListItems() {
	const navigate = useNavigate();
	const letfNav = [
		{
			name: 'Home',
			route: '/dashboard',
			icon: mdiHomeVariantOutline,
		},
		{
			name: 'Planboards',
			route: '/planboard',
			icon: mdiClipboardOutline,
		},
		{
			name: 'Teams',
			route: '/teams',
			icon: mdiAccountMultiplePlusOutline,
		},
		{
			name: 'Recycle Bin',
			route: '/bin',
			icon: mdiDeleteOutline,
		},
	];

	const navigateTo = (route) => {
		navigate(route);
	};
	// const Dashboard = () => {
	// 	navigate('/dashboard');
	// };
	// const Bin = () => {
	// 	navigate('/bin');
	// };
	const navFontSize = {
		'& .MuiTypography-root': {
			fontSize: '12px',
		},
	};
	return (
		<React.Fragment>
			{letfNav.map((data, index) => (
				<Tooltip key={index} title={data.name} placement='right'>
					<ListItemButton dense={true} onClick={() => navigateTo(data.route)}>
						<ListItemIcon sx={{ minWidth: '46px' }}>
							<Icon path={data.icon} title={data.name} size={1} />
						</ListItemIcon>
						<ListItemText sx={{ ...navFontSize }} primary={data.name} />
					</ListItemButton>
				</Tooltip>
			))}
			{/* <Tooltip title='Home' placement='right'>
				<ListItemButton onClick={Dashboard}>
					<ListItemIcon>
						<Icon path={mdiHome} title='Home' size={1} />
					</ListItemIcon>
					<ListItemText primary='Home' />
				</ListItemButton>
			</Tooltip>

			<ListItemButton dense={true} onClick={Planboards}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Planboards' />
			</ListItemButton>
			<ListItemButton onClick={() => navigate('/teams')}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='Teams' />
			</ListItemButton>

			<ListItemButton onClick={Bin}>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Recycle Bin' />
			</ListItemButton> */}
		</React.Fragment>
	);
}

ListItems.propTypes = {
	setselectedNav: PropTypes.func,
};
