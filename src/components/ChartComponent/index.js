import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: [220,334,564,55,434,778,124],
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Dataset 2',
			data: [225,339,569,60,439,783,129],
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

export function BarChart() {
	return (
		<div style={{ margin: '10px 0px' }}>
			<Bar
				options={options}
				data={data}
				style={{ width: '400px', height: '250px' }}
			/>
		</div>
	);
}
BarChart.propTypes = {
	options: PropTypes.object,
	data: PropTypes.object,
};
