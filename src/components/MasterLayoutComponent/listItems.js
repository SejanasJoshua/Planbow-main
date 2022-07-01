import * as React from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
// import gotoRouter from '@utils/GlobelFunction';

export default function ListItems() {
	const navigate = useNavigate();

	const Planboards = () => {
		navigate('/planboard');
	};
	const Dashboard = () => {
		navigate('/dashboard');
	};
	const Bin = () => {
		navigate('/bin');
	};
	return (
		<React.Fragment>
			<ListItemButton onClick={Dashboard}>
				<ListItemIcon>
					<Icon path={mdiHome} title='Home' size={1} />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItemButton>
			<ListItemButton onClick={Planboards}>
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
			</ListItemButton>
		</React.Fragment>
	);
}

ListItems.propTypes = {
	setselectedNav: PropTypes.func,
};
