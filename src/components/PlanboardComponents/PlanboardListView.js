import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import { mdiPencilOutline } from '@mdi/js';
import PropTypes from 'prop-types';
import axiosRequests from '@utils/axiosRequests';

export default function PlanboardListView(props) {
	let { planboards, handleDeleteOpen, handleEdit, assignedTasks } = props;
	const [assignedTasksData, setAssignedTasksData] = React.useState([]);

	React.useEffect(() => {
		assignedTasks.assignedTasks.map(async (item) => {
			const res = await axiosRequests.getData(
				`/planboard/get?planboard=${item}`
			);
			setAssignedTasksData([...assignedTasksData, res.data.data]);
		});
	}, []);
	React.useEffect(() => {
		console.log(assignedTasksData);
	}, [assignedTasksData]);

	return (
		<>
			<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
				{planboards?.map((row) => (
					<div key={row._id}>
						<ListItem
							alignItems='flex-start'
							secondaryAction={
								<>
									<IconButton
										edge='end'
										aria-label='edit'
										onClick={() => handleEdit(row)}
									>
										<Icon path={mdiPencilOutline} title='Edit' size={1} />
									</IconButton>
									<IconButton
										edge='end'
										aria-label='delete'
										onClick={() => handleDeleteOpen(row._id)}
									>
										<Icon path={mdiDeleteOutline} title='Delete' size={1} />
									</IconButton>
								</>
							}
						>
							<ListItemAvatar>
								<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
							</ListItemAvatar>
							<ListItemText
								// primary='Brunch this weekend?'
								primary={row.name}
								secondary={
									<React.Fragment>
										<Typography
											sx={{ display: 'inline' }}
											component='span'
											variant='body2'
											color='text.primary'
										>
											{row.user}
										</Typography>
										— I&rsquo;ll be in your neighborhood doing errands this…
									</React.Fragment>
								}
							/>
						</ListItem>
						<Divider variant='inset' component='li' />
					</div>
				))}
				{/*<ListItem
				alignItems='flex-start'
				secondaryAction={
					<IconButton edge='end' aria-label='delete'>
						<Icon path={mdiPencilOutline} title='Edit' size={1} />
						<Icon path={mdiDeleteOutline} title='Delete' size={1} />
					</IconButton>
				}
			>
				<ListItemAvatar>
					<Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
				</ListItemAvatar>
				<ListItemText
					primary='Brunch this weekend?'
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component='span'
								variant='body2'
								color='text.primary'
							>
								Ali Connors
							</Typography>
							— I&rsquo;ll be in your neighborhood doing errands this…
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant='inset' component='li' />
			 <ListItem alignItems='flex-start'>
				<ListItemAvatar>
					<Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
				</ListItemAvatar>
				<ListItemText
					primary='Summer BBQ'
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component='span'
								variant='body2'
								color='text.primary'
							>
								to Scott, Alex, Jennifer
							</Typography>
							— Wish I could come, but I&rsquo;m out of town this…
						</React.Fragment>
					}
				/>
			</ListItem>
			<Divider variant='inset' component='li' />
			<ListItem alignItems='flex-start'>
				<ListItemAvatar>
					<Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
				</ListItemAvatar>
				<ListItemText
					primary='Oui Oui'
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component='span'
								variant='body2'
								color='text.primary'
							>
								Sandra Adams
							</Typography>
							{' — Do you have Paris recommendations? Have you ever…'}
						</React.Fragment>
					}
				/>
			</ListItem> */}
			</List>
			{assignedTasks.assignedTasks ? (
				<>
					<Typography variant='h3'>Assigned Tasks</Typography>
					<List sx={{ width: '100%', bgcolor: 'background.paper' }}>
						{assignedTasksData.map((row) => (
							<div key={row._id}>
								<ListItem
									alignItems='flex-start'
									secondaryAction={
										<>
											<IconButton
												edge='end'
												aria-label='edit'
												onClick={() => handleEdit(row)}
											>
												<Icon path={mdiPencilOutline} title='Edit' size={1} />
											</IconButton>
											<IconButton
												edge='end'
												aria-label='delete'
												onClick={() => handleDeleteOpen(row._id)}
											>
												<Icon path={mdiDeleteOutline} title='Delete' size={1} />
											</IconButton>
										</>
									}
								>
									<ListItemAvatar>
										<Avatar
											alt='Remy Sharp'
											src='/static/images/avatar/1.jpg'
										/>
									</ListItemAvatar>
									<ListItemText
										// primary='Brunch this weekend?'
										primary={row.name}
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component='span'
													variant='body2'
													color='text.primary'
												>
													{row.user}
												</Typography>
												— I&rsquo;ll be in your neighborhood doing errands this…
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</div>
						))}
					</List>
				</>
			) : null}
		</>
	);
}
PlanboardListView.propTypes = {
	planboards: PropTypes.array,
	handleDeleteOpen: PropTypes.func,
	handleEdit: PropTypes.func,
	assignedTasks: PropTypes.object,
};
