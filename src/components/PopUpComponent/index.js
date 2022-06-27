import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function PopUpComponent({ message, type,visible,setVisible }) {
	return (
		visible?<Stack
			spacing={2}
			style={{
				position: 'absolute',
				top: '84px',
				width: '20%',
				right: '10px',
			}}
		>
			<Snackbar
				open={visible}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				key={Math.random().toString()}
        onClose={()=>setVisible(false)}
			>
				<Alert severity={type} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</Stack>:null
	);
}
PopUpComponent.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string,
  visible:PropTypes.bool,
  setVisible: PropTypes.func
};
