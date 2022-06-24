import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import  PropTypes  from 'prop-types';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PopUpComponent({message,type}) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={true} autoHideDuration={5000} >
        <Alert severity={type} sx={{ width: '100%' }}>
         {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
PopUpComponent.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string
};
