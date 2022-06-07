import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Icon from '@mdi/react';
import { mdiDotsVertical } from '@mdi/js';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PlanboardGridView(props) {
	let { planboards, handleDeleteOpen, handleEdit } = props;

	return (
		<Grid
			container
			spacing={1}
			sx={{
				display: 'flex',
			}}
		>
			{planboards?.map((row) => (
				<Grid
					item
					xs={12}
					md={4}
					lg={3}
					sx={{
						display: 'flex',
					}}
					key={row._id}
				>
					<Card sx={{ maxWidth: 345 }}>
						<CardContent>
							<Box>
								<Typography
									component='div'
									sx={{
										fontSize: '12px',
										textTransform: 'uppercase',
									}}
								>
									User Research
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
									<Avatar>
										<Icon path={mdiDotsVertical} title='Home' size={1} />
									</Avatar>
									<Grid sx={{ marginLeft: 1 }}>
										<Typography
											variant='h4'
											component='div'
											sx={{
												fontWeight: 500,
												fontSize: '20px',
												color: '#000',
											}}
										>
											{row.name}
										</Typography>
										<Typography
											variant='caption'
											display='block'
											sx={{ fontSize: '12px' }}
										>
											34 Attributes
										</Typography>
									</Grid>
								</Box>
								<Typography
									variant='body2'
									component='p'
									sx={{ fontSize: '14px' }}
								>
									Run Ideation Campaigns to process and collaborate on ideas to
									shortlist mature ones
								</Typography>
							</Box>
						</CardContent>
						<CardActions sx={{ flexGrow: 1 }}>
							<Button size='small' variant='containedLink'>
								Explore
							</Button>
							<Stack direction='row' spacing={1}>
								<Button
									variant='text'
									startIcon={<EditIcon />}
									onClick={() => handleEdit(row)}
								>
									Edit
								</Button>
								<Button
									variant='text'
									onClick={() => handleDeleteOpen(row._id)}
									endIcon={<DeleteIcon />}
								>
									Delete
								</Button>
							</Stack>
						</CardActions>
					</Card>
				</Grid>
			))}
			<Grid
				item
				xs={12}
				md={4}
				lg={3}
				sx={{
					display: 'flex',
				}}
			>
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Box>
							<Typography
								component='div'
								sx={{
									fontSize: '12px',
									textTransform: 'uppercase',
								}}
							>
								User Research
							</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
								<Avatar>
									<Icon path={mdiDotsVertical} title='Home' size={1} />
								</Avatar>
								<Grid sx={{ marginLeft: 1 }}>
									<Typography
										variant='h4'
										component='div'
										sx={{
											fontWeight: 500,
											fontSize: '20px',
											color: '#000',
										}}
									>
										Ideation
									</Typography>
									<Typography
										variant='caption'
										display='block'
										sx={{ fontSize: '12px' }}
									>
										34 Attributes
									</Typography>
								</Grid>
							</Box>
							<Typography
								variant='body2'
								component='p'
								sx={{ fontSize: '14px' }}
							>
								Run Ideation Campaigns to process and collaborate on ideas to
								shortlist mature ones
							</Typography>
						</Box>
					</CardContent>
					<CardActions>
						<Button size='small' variant='containedLink'>
							Explore
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</Grid>
	);
}
PlanboardGridView.propTypes = {
	planboards: PropTypes.array,
	handleDeleteOpen: PropTypes.func,
	handleEdit: PropTypes.func,
};
