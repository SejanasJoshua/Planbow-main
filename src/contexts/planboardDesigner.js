import React, { createContext, useState, useEffect } from 'react';
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

	// const updateCanvas = (data) => {
	// 	setPlanboard({ ...planboard, canvas: data });
	// };
	useEffect(() => {
		localStorage.setItem('PlanboardDesigner', selectedNav);
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
