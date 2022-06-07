import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Grid } from '@mui/material';
import IdeaActionSlider from './IdeaActionSlider';
import IdeaImapct from './IdeaImapct';

export default function IdeationActionItems() {
	return (
		<TreeView
			aria-label='file system navigator'
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
		>
			<TreeItem nodeId='1' label='Applications'>
				<TreeItem
					nodeId='2'
					label={
						<Grid container sx={{ alignItems: 'center' }}>
							<Grid item xs={12} sm={3} md={4}>
								variable width content
							</Grid>
							<Grid item xs={12} sm={3} md={2}>
								<IdeaActionSlider />
							</Grid>
							<Grid item xs={6} sm={3} md={2}>
								<IdeaImapct />
							</Grid>
							<Grid item xs={6} sm={3} md={2}>
								<IdeaImapct />
							</Grid>
						</Grid>
					}
				/>
			</TreeItem>
			<TreeItem nodeId='5' label='Documents'>
				<TreeItem
					nodeId='10'
					label={
						<Grid container sx={{ alignItems: 'center' }}>
							<Grid item xs={12} sm={3} md={4}>
								variable width content
							</Grid>
							<Grid item xs={12} sm={3} md={2}>
								<IdeaActionSlider />
							</Grid>
							<Grid item xs={6} sm={3} md={2}>
								<IdeaImapct />
							</Grid>
							<Grid item xs={6} sm={3} md={2}>
								<IdeaImapct />
							</Grid>
						</Grid>
					}
				/>
				<TreeItem nodeId='6' label='MUI'>
					<TreeItem
						nodeId='8'
						label={
							<Grid container sx={{ alignItems: 'center' }}>
								<Grid item xs={12} sm={3} md={4}>
									variable width content
								</Grid>
								<Grid item xs={12} sm={3} md={2}>
									<IdeaActionSlider />
								</Grid>
								<Grid item xs={6} sm={3} md={2}>
									<IdeaImapct />
								</Grid>
								<Grid item xs={6} sm={3} md={2}>
									<IdeaImapct />
								</Grid>
							</Grid>
						}
					/>
				</TreeItem>
			</TreeItem>
		</TreeView>
	);
}
