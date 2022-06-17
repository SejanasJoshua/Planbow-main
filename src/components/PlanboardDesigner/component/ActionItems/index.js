import React, { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Grid } from '@mui/material';
import ActionSlider from './ActionSlider';
import Imapct from './Imapct';
import PropTypes from 'prop-types';
import axiosRequests from '@utils/axiosRequests';
import { useSelector } from 'react-redux';
export default function ActionItems() {
	const {
		planboard: { actionItems: actionItemData },
	} = useSelector((state) => state);
	useEffect(() => {
		if (actionItemData.length) {
			setActionItem(actionItemData);
		}
	}, []);
	const [state, setState] = useState([]);
	const [actionItems, setActionItem] = useState([]);
	const dummy = {
		message: 'success',
		data: [
			{
				_id: '62847b966fffb29471c9ad72',
				component_id: '628347b95dfa32c3291ad19f',
				planboard_id: '624dba3e9c437cb32217cb90',
				idea: 'new Idea',
				createdAt: '2022-05-18T04:52:38.502Z',
				updatedAt: '2022-05-18T12:39:06.777Z',
				__v: 0,
				data: {
					refine: [],
				},
			},
			{
				_id: '62847bc96fffb29471c9ad80',
				component_id: '628347b95dfa32c3291ad19f',
				planboard_id: '624dba3e9c437cb32217cb90',
				idea: 'Creative Idea',
				createdAt: '2022-05-18T04:53:29.939Z',
				updatedAt: '2022-05-18T04:54:14.042Z',
				__v: 0,
				data: {
					refine: [],
				},
			},
			{
				_id: '62849bf06fffb29471c9ad9e',
				component_id: '628347b95dfa32c3291ad19f',
				planboard_id: '624dba3e9c437cb32217cb90',
				idea: 'third idea',
				createdAt: '2022-05-18T07:10:40.226Z',
				updatedAt: '2022-05-18T07:11:14.964Z',
				__v: 0,
				data: {
					refine: [],
				},
			},
			{
				_id: '6284e8766fffb29471c9ade1',
				component_id: '628347b95dfa32c3291ad19f',
				planboard_id: '624dba3e9c437cb32217cb90',
				idea: 'This is a Demo idea',
				createdAt: '2022-05-18T12:37:10.795Z',
				updatedAt: '2022-05-18T12:37:53.907Z',
				__v: 0,
				data: {
					refine: [
						{
							id: '57390f45-cf9a-4e40-936e-8b294bf7526e',
							title: 'Hypothesis',
							subtitle: 'Brief your value proposition in 140 words',
						},
						{
							id: '72a2507a-167b-4b6a-82fa-eed26b051001',
							title: 'Value Proposition',
							subtitle: 'Brief your value proposition in 140 words',
						},
					],
				},
			},
		],
	};
	const selectItem = (e, nodeId) => {
		if (!state.filter((data) => data.componentID == nodeId).length)
			fetchChildren({
				planboardID: actionItems[0]?.planboardID,
				componentID: nodeId,
			});
	};
	const fetchChildren = async ({ planboardID, componentID }) => {
		const response = await axiosRequests.getData(
			`/componentIdeas/get?planboardID=${planboardID}&componentID=${componentID}`
		);
		console.log(response);
		// if(response?.data?.data?.length){
		setState([...state, { planboardID, componentID, data: dummy?.data }]);
		//  }
	};
	return (
		<TreeView
			aria-label='file system navigator'
			multiSelect={false}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}
			onNodeSelect={selectItem}
		>
			{actionItems?.length
				? actionItems.map((data) => {
						return (
							<TreeItem nodeId={data?._id} label={data?.name} key={data?._id}>
								<TreeItem
									nodeId={data?.id}
									label={
										state.filter((res) => res.componentID == data?._id).length
											? state.filter((res) => res.componentID == data?._id)?.[0]
													?.data.map((child) => (
														<Grid key={child?._id} container sx={{ alignItems: 'center' }}>
															<Grid item xs={12} sm={3} md={4}>
																{child?.idea}
															</Grid>
															<Grid item xs={12} sm={3} md={2}>
																<ActionSlider />
															</Grid>
															<Grid item xs={6} sm={3} md={2}>
																<Imapct />
															</Grid>
															<Grid item xs={6} sm={3} md={2}>
																<Imapct />
															</Grid>
														</Grid>
													))
											: '.............Loading........'
									}
								/>
							</TreeItem>
						);
				  })
				: '....................Loading...'}
			;
		</TreeView>
	);
}
ActionItems.propTypes = {
	actionItemData: PropTypes.arrayOf(PropTypes.object),
};
