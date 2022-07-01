import React from 'react';
import {
	Avatar,
	Card,
	CardHeader,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '@redux/actions';
function SidePanel() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user: User } = useSelector((state) => state);
	const handleLogout = async () => {
		navigateToLogin();
		dispatch(resetState());
	};
	const navigateToLogin = () => {
		navigate('/', { state: { action: 'logout', from: 'SidePanel' } });
	};
	return (
		<div>
			<Card sx={{ maxWidth: 345, minWidth: 300 }}>
				<CardHeader
					avatar={
						User?.profilePic?.length > 0 ? (
							<Avatar sx={{ background: 'red' }} src={User?.profilePic} />
						) : (
							<Avatar sx={{ background: 'red' }}>
								{User?.fullName?.[0].toUpperCase()}
							</Avatar>
						)
					}
					title={User?.fullName}
					subheader='Owner'
				/>
				<List>
					<ListItem>
						<ListItemButton>
							<ListItemText primary='Profile' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton>
							<ListItemText primary='Manage' />
						</ListItemButton>
					</ListItem>
					<ListItem>
						<ListItemButton onClick={handleLogout}>
							<ListItemText primary='Logout' />
						</ListItemButton>
					</ListItem>
				</List>
			</Card>
		</div>
	);
}

export default SidePanel;
