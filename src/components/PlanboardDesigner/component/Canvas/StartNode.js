import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Handle } from 'react-flow-renderer';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import { ICONS } from '@shared/assets';
import { planboardComponentsModal } from '@redux/actions';
import { useDispatch } from 'react-redux';

export default function StartNode() {
	const dispatch = useDispatch();
	const openComponentPicker = () => {
		dispatch(planboardComponentsModal(true));
	};
	return (
		<>
			<Grid
				// className="nodrag"
				container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Grid item>
					<img src={ICONS.startNode} width={32} alt='Start Icon' />
				</Grid>
				<Grid item>
					<Typography variant='h5' component='div'>
						Start
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
				onClick={openComponentPicker}
			>
				<Icon path={mdiPlusCircle} title='Add' size={1} />
			</IconButton>
			<Handle type='source' position='right' style={{ background: '#555' }} />
		</>
	);
}
