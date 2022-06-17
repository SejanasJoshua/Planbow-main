import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const NotificationPopup = ({ notifications }) => {
	const notificationList = notifications[0]?.filter(
		(val) => !notifications[1]?.includes(val)
	);
	return (
		<div>
			<Box sx={{ padding: '10px' }}>
				<List>
					{notificationList?.map((item) => (
						<ListItem key={item._id}>
							<ListItemButton>
								<ListItemText primary={item.content} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</div>
	);
};

export default NotificationPopup;

NotificationPopup.propTypes = {
	notifications: PropTypes.array,
};
