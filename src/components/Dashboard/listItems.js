import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

export default function ListItems({ setselectedNav }) {
	const navigate = useNavigate();

	const toComponentB = () => {
		navigate('/planboard-designer');
	};
	return (
		<React.Fragment>
			<ListItemButton onClick={() => setselectedNav('home')}>
				<ListItemIcon>
					<Icon path={mdiHome} title='Home' size={1} />
				</ListItemIcon>
				<ListItemText primary='Home' />
			</ListItemButton>
			<ListItemButton onClick={() => setselectedNav('planboards')}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary='Planboards' />
			</ListItemButton>
			<ListItemButton onClick={()=>setselectedNav('teams')}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary='Teams' />
			</ListItemButton>
			<ListItemButton
				onClick={() => {
					toComponentB();
				}}
			>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary='Planboard Designer' />
			</ListItemButton>
			{/* <ListItemButton>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Users & Account' />
			</ListItemButton> */}
			{/* <ListItemButton>
				<ListItemIcon>
					<LayersIcon />
				</ListItemIcon>
				<ListItemText primary='Settings' />
			</ListItemButton> */}
			<ListItemButton>
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
