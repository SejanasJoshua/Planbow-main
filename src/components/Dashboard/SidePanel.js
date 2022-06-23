import React from 'react';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';
function SidePanel() {
	return (
		<div >
			<List>
				<ListItem >
					<ListItemButton>
						<ListItemText primary='Profile' />
					</ListItemButton>
				</ListItem>
				<ListItem >
					<ListItemButton>
						<ListItemText primary='Manage' />
					</ListItemButton>
				</ListItem>
                <ListItem >
					<ListItemButton>
						<ListItemText primary='Logout' />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);
}

export default SidePanel;
