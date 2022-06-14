import React from 'react';
import {BarChart} from '../../../ChartComponent';
import BasicTable from './BasicTable';
import {Divider} from '@mui/material';
function RightPanel() {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent: 'space-evenly'}}>
    <BarChart/>
    <Divider/>
    <BasicTable/>
    </div>
  );
}

export default RightPanel;