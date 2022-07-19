import React, { useContext, useEffect } from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import PlanboardDesignerContext from '@contexts/planboardDesigner';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// let EVENTS = [
// 	{
// 		event_id: 1,
// 		title: 'Event 1',
// 		start: new Date('2022/5/2 09:30'),
// 		end: new Date('2022/5/2 10:30'),
// 	},
// 	{
// 		event_id: 2,
// 		title: 'Event 2',
// 		start: new Date('2022/5/4 10:00'),
// 		end: new Date('2022/5/4 11:00'),
// 	},
// ];

export default function Events() {
	const { planboard } = useContext(PlanboardDesignerContext);
	let fetchedData = {
		planboardDate: false,
		componentDates: false,
	};
	const [state, setState] = useState({
		events: [],
		startEndDateFetched: false,
	});

	const getPlanboardDates = () => {
		console.log('planboard Dates');
		if (!fetchedData.planboardDate)
			if (planboard?.startDate) {
				setState((prev) => ({
					...prev,
					startEndDateFetched: true,
					events: [
						...prev.events,
						{
							event_id: 1,
							title: planboard.name + ' Start Date',
							start: new Date(planboard.startDate),
							end: new Date(planboard.startDate),
						},
						{
							event_id: 2,
							title: planboard.name + ' End Date',
							start: new Date(planboard.endDate),
							end: new Date(planboard.endDate),
						},
					],
				}));
				fetchedData = { ...fetchedData, planboardDate: true };
			}
	};

	const getComponentDates = () => {
		const res = planboard?.canvas?.nodes?.filter((item) => item.startDate);
		if (!fetchedData.componentDates)
			if (res.length) {
				res.map((item) => {
					setState((prev) => ({
						...prev,
						events: [
							...prev.events,
							{
								event_id: uuidv4(),
								title: item.data.label + ' Start Date',
								start: new Date(item.startDate),
								end: new Date(item.startDate),
							},
							{
								event_id: uuidv4(),
								title: item.data.label + ' End Date',
								start: new Date(item.endDate),
								end: new Date(item.endDate),
							},
						],
					}));
				});
				fetchedData = { ...fetchedData, componentDates: true };
			}
	};

	useEffect(() => {
		getPlanboardDates();
		getComponentDates();
	}, []);

	// const fetchRemote = async (query) => {
	// 	console.log('Query: ', query);
	// 	/**Simulate fetchin remote data */
	// 	return new Promise((res) => {
	// 		setTimeout(() => {
	// 			res(EVENTS);
	// 		}, 1);
	// 	});
	// };

	// const handleConfirm = async (event, action) => {
	// 	console.log(event, action);
	// 	if (action === 'edit') {
	// 		/** PUT event to remote DB */
	// 	} else if (action === 'create') {
	// 		/**POST event to remote DB */
	// 	}
	// 	/**
	// 	 * Make sure to return 4 mandatory fields:
	// 	 * event_id: string|number
	// 	 * title: string
	// 	 * start: Date|string
	// 	 * end: Date|string
	// 	 * ....extra other fields depend on your custom fields/editor properties
	// 	 */
	// 	// Simulate http request: return added/edited event
	// 	return new Promise((res) => {
	// 		setTimeout(() => {
	// 			res({
	// 				...event,
	// 				event_id: event.event_id || Math.random(),
	// 			});
	// 		}, 1);
	// 	});
	// };

	// const handleDelete = async (deletedId) => {
	// 	// Simulate http request: return the deleted id
	// 	return new Promise((res) => {
	// 		setTimeout(() => {
	// 			res(deletedId);
	// 		}, 1);
	// 	});
	// };
	const week = {
		weekDays: [0, 1, 2, 3, 4, 5, 6],
		weekStartOn: 1,
		startHour: 9,
		endHour: 17,
		step: 60,
	};
	const month = {
		weekDays: [0, 1, 2, 3, 4, 5, 6],
		weekStartOn: 1,
		startHour: 9,
		endHour: 17,
	};
	return (
		<div>
			<Scheduler
				view='month'
				week={week}
				month={month}
				events={state.events}
				// remoteEvents={fetchRemote}
				// onConfirm={handleConfirm}
				// onDelete={handleDelete}
			/>
		</div>
	);
}
