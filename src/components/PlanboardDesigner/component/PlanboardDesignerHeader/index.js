import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

export default function PlanboardDesignerHeader(props) {
	const navigate = useNavigate();

	const toComponentB = () => {
		navigate('/dashboard');
	};
	const { planboard } = useSelector((state) => state);

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
					{props?.location?.state?.editable ? '' : planboard?.name}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
PlanboardDesignerHeader.propTypes = {
	location: PropTypes.object,
};
