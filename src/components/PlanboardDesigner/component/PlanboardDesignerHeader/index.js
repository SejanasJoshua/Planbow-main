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

export default function PlanboardDesignerHeader() {
	const navigate = useNavigate();

	const toComponentB = () => {
		navigate('/dashboard');
	};
	let planboard = '';
	planboard = useSelector((state) => state.planboard);

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
