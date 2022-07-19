import React, { createContext, useState, useEffect } from 'react';
import axiosRequests from '@utils/axiosRequests';
import PropTypes from 'prop-types';

const PlanboardDesignerContext = createContext();

export const PlanboardDesignerProvider = ({ children }) => {
	const [contextState, setContextState] = useState({
		rightDrawer: false,
		calendarDialog: false,
		delegateDialog: false,
	});
	// const {workspace:Workspace}=useSelector(state=>state);
	const [selectedNav, setselectedNav] = useState('ideasummary');
	const [planboard, setPlanboard] = useState(null);
	const [selectedPlanboardComponent, setSelectedPlanboardComponent] =
		useState(null);
	const [actionItem, setActionItemData] = useState([]);

	const actionItemData = async () => {
		const response = await axiosRequests.getData(
			`/planboardComponent/get?planboardID=${planboard?._id}`
		);
		if (response?.data?.data?.length) setActionItemData(response?.data?.data);
	};
	useEffect(() => {
		if (planboard?._id) actionItemData();
	}, [selectedNav, planboard]);

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
				contextState,
				setContextState,
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
