import React, { createContext, useState, useEffect } from 'react';
import axiosRequests from '@utils/axiosRequests';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PlanboardDesignerContext = createContext();

export const PlanboardDesignerProvider = ({ children }) => {
	const {workspace:Workspace}=useSelector(state=>state);
	const [selectedNav, setselectedNav] = useState('ideasummary');
	const [planboard, setPlanboard] = useState(null);
	const [totalPlanboards, setTotalPlanboards] = useState([]);
	const [selectedPlanboardComponent, setSelectedPlanboardComponent] =
		useState(null);
	const [actionItem, setActionItemData] = useState([]);

	const actionItemData = async () => {
		const response = await axiosRequests.getData(
			'/planboardComponent/get?planboardID=624dba3e9c437cb32217cb90'
		);
		if (response?.data?.data?.length) setActionItemData(response?.data?.data);
	};
	const getPlanboards = async () => {
			const response = await axiosRequests.getData(
				`/planboard/get?workspace=${Workspace._id}`
			);
			if (response.data.data === 'No-Data') {
				setTotalPlanboards([]);
			} else {
				setTotalPlanboards(response.data.data);
			}
	};
	useEffect(() => {
		actionItemData(),
		getPlanboards();
	}, [selectedNav]);

	return (
		<PlanboardDesignerContext.Provider
			value={{
				planboard,
				selectedNav,
				setselectedNav,
				setPlanboard,
				selectedPlanboardComponent,
				setSelectedPlanboardComponent,
				actionItem,
				totalPlanboards
			}}
		>
			{children}
		</PlanboardDesignerContext.Provider>
	);
};

PlanboardDesignerProvider.propTypes = {
	children: PropTypes.any,
};
export default PlanboardDesignerContext;
