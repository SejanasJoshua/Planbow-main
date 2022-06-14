import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import Icon from '@mdi/react';
import { mdiRectangleOutline, mdiRectangle } from '@mdi/js';

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#1a90ff',
	},
	'& .MuiRating-iconHover': {
		color: '#0377e4',
	},
});

export default function Imapct() {
	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			{/* <Typography component='legend'>Custom icon and color</Typography> */}
			<StyledRating
				name='customized-color'
				defaultValue={2}
				icon={<Icon path={mdiRectangle} title='Impact' size={1} />}
				emptyIcon={<Icon path={mdiRectangleOutline} title='Impact' size={1} />}
			/>
		</Box>
	);
}
