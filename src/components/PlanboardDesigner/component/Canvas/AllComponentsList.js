import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import SearchComponents from './SearchComponents';
import CardComponentsList from './CardComponentsList';
import ComponentDetails from './ComponentDetails';
import { useSelector, useDispatch } from 'react-redux';
import { planboardComponentsModal } from '@redux/actions';

export default function AllComponentsList(props) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();
	// let components = [];
	const [components, setComponents] = React.useState([]);

	const planboardComponentModal = useSelector(
		(state) => state.settings.planboardComponentsModal
	);

	const [selectedComponent, setSelectedComponent] = React.useState({});

	const handleLaunch = () => {
		props.addNodes(components);
		setComponents([]);
		dispatch(planboardComponentsModal(false));
	};
	const componentsClose = () => {
		setComponents([]);
		dispatch(planboardComponentsModal(false));
	};
	// React.useEffect(() => {
	// 	console.log(components);
	// }, [components]);
	return (
		<Dialog
			fullScreen={fullScreen}
			maxWidth='string'
			// open={props.components}
			open={planboardComponentModal}
			onClose={componentsClose}
			aria-labelledby='responsive-dialog-title'
			// sx={{ md: { minWidth: 800 }, xs: { minWidth: 'auto' } }}
		>
			{/* <DialogTitle id='responsive-dialog-title'>
				{'Use Google location service'}
			</DialogTitle> */}
			<DialogContent>
				{/* <DialogContentText>
					Let Google help apps determine location. This means sending anonymous
					location data to Google, even when no apps are running.
				</DialogContentText> */}
				<Grid container spacing={2}>
					<Grid item sm={4} sx={{ width: 400 }}>
						<Typography
							variant='div'
							sx={{ fontSize: '18px', fontWeight: 700 }}
							component='div'
						>
							Planning Components
						</Typography>
						<SearchComponents />
						<Grid sx={{ my: '20px' }}>
							<CardComponentsList
								setSelectedComponent={setSelectedComponent}
								addNodes={props.addNodes}
								components={components}
								setComponents={setComponents}
							/>
						</Grid>
					</Grid>
					<Grid item sm={8}>
						<ComponentDetails selectedComponent={selectedComponent} />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				{/* <Button autoFocus onClick={props.componentsClose}> */}
				<Button autoFocus onClick={componentsClose}>
					Cancel
				</Button>
				<Button
					variant='containedPrimary'
					// onClick={props.componentsClose}
					onClick={handleLaunch}
					autoFocus
				>
					Launch Planboard
				</Button>
			</DialogActions>
		</Dialog>
	);
}

AllComponentsList.propTypes = {
	// componentsClickOpen: PropTypes.func,
	// componentsClose: PropTypes.func,
	// components: PropTypes.bool,
	addNodes: PropTypes.func,
};
