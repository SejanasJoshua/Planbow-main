import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
// import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateURLHistory } from '@redux/actions';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/AddOutlined';

import labels from '@shared/labels';

const imagesLink = [
	{ src: './assets/images/img1.jpg', alt: 'Image1' },
	{ src: './assets/images/img2.webp', alt: 'Image2' },
	{ src: './assets/images/img3.webp', alt: 'Image3' },
];

export default function MyPlanboards({ planboards }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleNewPlanboard = () => {
		dispatch(updateURLHistory('/dashboard'));
		navigate('/planboard-designer', {
			state: { editable: true, newPlanboard: true },
		});
	};
	return (
		<Grid item xs={12}>
			<Grid>
				<Typography variant='h2' component='h2'>
					{labels['component.home.label.title-myplanboard']}
				</Typography>
			</Grid>
			<Grid
				container
				spacing={1}
				sx={{
					display: 'flex',
				}}
			>
				<Grid
					item
					xs={12}
					md={2}
					sx={{
						display: 'flex',
					}}
				>
					<Button
						onClick={handleNewPlanboard}
						variant='contained'
						className='h-full flex flex-col rounded mr-12'
					>
						<AddIcon sx={{ fontSize: 30 }} />
						New Planboard
					</Button>
				</Grid>
				{planboards.slice(0, 3).map((item, index) => (
					<Grid
						item
						xs={12}
						md={3}
						// lg={3}
						sx={{
							display: 'flex',
						}}
						key={item._id}
					>
						<Card sx={{ maxWidth: 345 }}>
							<CardHeader
								avatar={
									<Avatar sx={{ background: 'red' }} aria-label='recipe'>
										R
									</Avatar>
								}
								// action={<Icon path={mdiDotsVertical} title='Home' size={1} />}
								// title={
								// 	<Typography
								// 		variant='h3'
								// 		className='text-xl font-inter-bold font-bold'
								// 	>
								// 		{item.name}
								// 	</Typography>
								// }
								title={item.name}
								// title='Shrimp and Chorizo Paella'
								// subheader='September 14, 2016'
							/>
							<CardMedia
								sx={{ filter: 'grayscale(60%)' }}
								component='img'
								height='194'
								// image={imagesLink[index]}
								image={imagesLink[index].src}
								alt='Paella dish'
							/>
							{/* <CardContent
								sx={{ display: 'flex', padding: '10px', marginTop: '16px' }}
							>
								<Box sx={{ flex: 1 }}>
									<IconButton aria-label='user 1' className='p-2'>
										<AccountCircleIcon
											sx={{ color: '#fcba03', fontSize: 40 }}
										/>
									</IconButton>
									<IconButton aria-label='user 2' className='p-2'>
										<AccountCircleIcon
											sx={{ color: '#fcba03', fontSize: 40 }}
										/>
									</IconButton>
									<IconButton aria-label='user 3' className='p-2'>
										<AccountCircleIcon
											sx={{ color: '#fcba03', fontSize: 40 }}
										/>
									</IconButton>
								</Box>
								<Typography
									variant='body2'
									className='underline self-center text-pink-500'
								>
									Due in 5 Days
								</Typography>
							</CardContent> */}
						</Card>
					</Grid>
				))}

				{/* <Grid
					item
					spacing={3}
					xs={12}
					md={4}
					lg={3}
					sx={{
						display: 'flex',
					}}
				>
					<Card sx={{ maxWidth: 345 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ background: 'red' }} aria-label='recipe'>
									R
								</Avatar>
							}
							action={<Icon path={mdiDotsVertical} title='Home' size={1} />}
							title='Shrimp and Chorizo Paella'
							subheader='September 14, 2016'
						/>
						<CardMedia
							component='img'
							height='194'
							image='https://themeselection.com/wp-content/webpc-passthru.php?src=https://themeselection.com/wp-content/uploads/2020/11/best-tailwind-admin-templates-thegem-blog-timeline-large.jpg&nocache=1'
							alt='Paella dish'
						/>
					</Card>
				</Grid>
				<Grid
					item
					spacing={3}
					xs={12}
					md={4}
					lg={3}
					sx={{
						display: 'flex',
					}}
				>
					<Card sx={{ maxWidth: 345 }}>
						<CardHeader
							avatar={
								<Avatar sx={{ background: 'red' }} aria-label='recipe'>
									R
								</Avatar>
							}
							action={<Icon path={mdiDotsVertical} title='Home' size={1} />}
							title='Shrimp and Chorizo Paella'
							subheader='September 14, 2016'
						/>
						<CardMedia
							component='img'
							height='194'
							image='https://themeselection.com/wp-content/webpc-passthru.php?src=https://themeselection.com/wp-content/uploads/2020/01/20-bootstrap-simple-admin-panel-template-free-thegem-blog-timeline-large.jpg&nocache=1'
							alt='Paella dish'
						/>
					</Card>
				</Grid> */}
			</Grid>
		</Grid>
	);
}
MyPlanboards.propTypes = {
	planboards: PropTypes.array,
};
