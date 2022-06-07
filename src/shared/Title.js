import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Title(props) {
	return (
		<Typography variant='h6' component='h2'>
			{props.children}
		</Typography>
	);
}

Title.propTypes = {
	children: PropTypes.node,
};

export default Title;