import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

import { planboardAttributes } from '../../../../data/planboardAttributes';

// let components = [];
export default function CardComponentsList(props) {
	const selectedComponents = (e, component) => {
		// if (e.target.checked == true) props.components.push(component);
		if (e.target.checked == true)
			props.setComponents([...props.components, component]);
		else {
			const n = props.components.filter((item) => item._id !== component._id);
			props.setComponents(n);
		}
	};
	return (
		<>
			{planboardAttributes.map((item) => (
				<Card
					sx={{ width: '100%', mb: '10px' }}
					key={item._id}
					// onClick={() => setCurrentComponent(item)}
					onClick={() => props.setSelectedComponent(item)}
				>
					<CardHeader
						// avatar={<img src={ICONS.startNode} alt='icon name' />}
						avatar={<img src={item.icon} alt={item.name} />}
						action={
							<Checkbox
								sx={{ ml: 'auto' }}
								// checked={item.selected}
								// onChange={() => setActive(item._id)}
								onChange={(e) => selectedComponents(e, item)}
								name='loading'
								color='primary'
							/>
						}
						title={
							<Grid sx={{ display: 'flex', flexDirection: 'column' }}>
								<Typography
									sx={{ fontWeight: 'bold', fontSize: '16px' }}
									variant='h5'
									component='span'
								>
									{item.name}
								</Typography>
								<Typography
									sx={{ fontSize: '14px' }}
									variant='span'
									component='span'
								>
									35 Attributes
								</Typography>
							</Grid>
						}
					/>
					{/* <CardContent className='flex' sx={{ py: 0 }}></CardContent> */}
					<CardActions disableSpacing>
						<Button sx={{ ml: 'auto' }} size='small' variant='containedLink'>
							Explore
						</Button>
					</CardActions>
				</Card>
			))}

			{/* <Card
				sx={{ width: '100%' }}
				// key={item._id}
				// onClick={() => setCurrentComponent(item)}
			>
				<CardHeader
					avatar={<img src={ICONS.customNode} alt='icon name' />}
					action={
						<Checkbox
							sx={{ ml: 'auto' }}
							// checked={item.selected}
							// onChange={() => setActive(item._id)}
							name='loading'
							color='primary'
						/>
					}
					title={
						<Grid sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography
								sx={{ fontWeight: 'bold', fontSize: '16px' }}
								variant='h5'
								component='span'
							>
								Ideation Node
							</Typography>
							<Typography
								sx={{ fontSize: '14px' }}
								variant='span'
								component='span'
							>
								35 Attributes
							</Typography>
						</Grid>
					}
				/>
				<CardActions disableSpacing>
					<Button sx={{ ml: 'auto' }} size='small' variant='containedLink'>
						Explore
					</Button>
				</CardActions>
			</Card> */}
		</>
	);
}
CardComponentsList.propTypes = {
	setSelectedComponent: PropTypes.func,
	addNodes: PropTypes.func,
	components: PropTypes.array,
	setComponents: PropTypes.func,
};
