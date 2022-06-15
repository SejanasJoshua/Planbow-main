import React, { createContext, useState, useEffect } from 'react';
import axiosRequests from '@utils/axiosRequests';
import PropTypes from 'prop-types';

const PlanboardDesignerContext = createContext();

export const PlanboardDesignerProvider = ({ children }) => {
	// const [canvas, setCanvas] = useState();
	const [selectedNav, setselectedNav] = useState(
		localStorage.getItem('PlanboardDesigner') || 'ideasummary'
	);
	const [planboard, setPlanboard] = useState(null);
	const [selectedPlanboardComponent, setSelectedPlanboardComponent] =
		useState(null);
	const [actionItem,setActionItemData]=useState([]);
	// const updateCanvas = (data) => {
	// 	setPlanboard({ ...planboard, canvas: data });
	// };
	const actionItemData = async () => {
		const response = await axiosRequests.getData(
			'/planboardComponent/get?planboardID=624dba3e9c437cb32217cb90'
		);
		if(response?.data?.data?.length) setActionItemData(response?.data?.data);
	};
	useEffect(() => {
		localStorage.setItem('PlanboardDesigner', selectedNav);
		actionItemData();
	}, [selectedNav]);
	// useEffect(() => {
	// 	const abc = localStorage.getItem('PlanboardDesigner');
	// 	setselectedNav(abc||'ideasummary');
	// }, []);
	return (
		<PlanboardDesignerContext.Provider
			value={{
				planboard,
				// updateCanvas,
				selectedNav,
				setselectedNav,
				setPlanboard,
				selectedPlanboardComponent,
				setSelectedPlanboardComponent,
				actionItem
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
