import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';

import { ICONS } from '@shared/assets';
import AllComponentsList from './AllComponentsList';
import { planboardComponentsModal } from '@redux/actions';
import { useDispatch } from 'react-redux';

export default function StartNode() {
	// const [components, setComponents] = React.useState(false);
	const dispatch = useDispatch();
	const componentsClickOpen = () => {
		// setComponents(true);
		dispatch(planboardComponentsModal(true));
	};
	// const componentsClose = () => {
	// 	// setComponents(false);
	// 	dispatch(planboardComponentsModal(false));
	// };
	return (
		<>
			<Grid 
			className="nodrag"
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
					onClick={componentsClickOpen}
				>
					<Icon path={mdiPlusCircle} title='Add' size={1} />
				</IconButton>
			<AllComponentsList
			// components={components}
			// componentsClickOpen={componentsClickOpen}
			// componentsClose={componentsClose}
			/>
			<Handle
				type='source'
				position='right'
				style={{ background: '#555' }}
				// isConnectable={isConnectable}
			/>
		</>
	);
}
