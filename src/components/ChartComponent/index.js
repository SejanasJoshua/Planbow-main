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

export function BarChart({options,data}) {
  return(<div style={{margin:'10px 0px'}}>
     {Object.keys(data).length?<Bar options={options} data={data} style={{width:'400px' , height:'250px'}} />
    :'....................Loading................' 
    }
  </div>) ;
 
}
BarChart.propTypes = {
options:PropTypes.object,
data:PropTypes.object
};
