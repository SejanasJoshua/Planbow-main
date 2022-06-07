import React from 'react';
import { Scheduler } from '@aldabil/react-scheduler';

const EVENTS = [
	{
		event_id: 1,
		title: 'Event 1',
		start: new Date('2022/5/2 09:30'),
		end: new Date('2022/5/2 10:30'),
	},
	{
		event_id: 2,
		title: 'Event 2',
		start: new Date('2022/5/4 10:00'),
		end: new Date('2022/5/4 11:00'),
	},
];

export default function IdeationEvents() {
	const fetchRemote = async (query) => {
		console.log('Query: ', query);
		/**Simulate fetchin remote data */
		return new Promise((res) => {
			setTimeout(() => {
				res(EVENTS);
			}, 3000);
		});
	};

	const handleConfirm = async (event, action) => {
		console.log(event, action);
		if (action === 'edit') {
			/** PUT event to remote DB */
		} else if (action === 'create') {
			/**POST event to remote DB */
		}
		/**
		 * Make sure to return 4 mandatory fields:
		 * event_id: string|number
		 * title: string
		 * start: Date|string
		 * end: Date|string
		 * ....extra other fields depend on your custom fields/editor properties
		 */
		// Simulate http request: return added/edited event
		return new Promise((res) => {
			setTimeout(() => {
				res({
					...event,
					event_id: event.event_id || Math.random(),
				});
			}, 3000);
		});
	};

	const handleDelete = async (deletedId) => {
		// Simulate http request: return the deleted id
		return new Promise((res) => {
			setTimeout(() => {
				res(deletedId);
			}, 3000);
		});
	};
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
				view='week'
				week={week}
				month={month}
				events={EVENTS}
				remoteEvents={fetchRemote}
				onConfirm={handleConfirm}
				onDelete={handleDelete}
			/>
		</div>
	);
}
