import React from 'react';
import { BarChart } from '../../../ChartComponent';
import BasicTable from './BasicTable';
import { Divider } from '@mui/material';
function RightPanel() {
	const labels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
	];
	const data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: [500, 600, 545, 667, 324, 787, 590],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Dataset 2',
				data: [580, 690, 505, 697, 374, 717, 700],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Bar Chart',
			},
		},
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly',
				position: 'absolute',
				right: '10%',
			}}
		>
			<BarChart options={options} data={data} />
			<Divider />
			<BasicTable />
		</div>
	);
}

export default RightPanel;
