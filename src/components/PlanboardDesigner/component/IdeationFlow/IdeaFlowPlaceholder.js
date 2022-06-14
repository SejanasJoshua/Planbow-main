import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IdeaTabsNav from './IdeaTabsNav';
import IdeaCapture from './IdeaCapture';
import IdeaValidate from './IdeaValidate';
import IdeaFinalize from './IdeaFinalize';
import IdeaRefine from './IdeaRefine';
// import { useSelector } from 'react-redux';
import axiosRequests from '@utils/axiosRequests';

export default function IdeaFlowPlaceholder({
	SetideaNav,
	currentselect,
	deleteIdea,
}) {
	const [ideaNavTab, SetideaNavTab] = React.useState('capture');
	const [attributes, setAttributes] = React.useState({
		capture: currentselect?.data?.capture,
		refine: currentselect?.data?.refine,
		validate: currentselect?.data?.validate,
		finalize: [],
	});
	// const selectedComponent = useSelector(
	// 	(state) => state.settings.planboardComponent
	// );
	// console.log(selectedComponent);
	const saveData = () => {
		console.log(currentselect);
		try {
			axiosRequests.putData('/componentIdeas/update', {
				id: currentselect.id,
				data: attributes,
			});
		} catch (e) {
			console.log(e);
		}
	};
	// useEffect(() => {
	// 	currentselect.data && setAttributes({
	// 		capture:curr
	// 	})
	// },[])
	return (
		<>
			<Box>
				<Grid
					onClick={() => {
						SetideaNav('youridea');
						saveData();
					}}
				>
					back {currentselect.idea}
				</Grid>
				<Grid onClick={deleteIdea}>Delete</Grid>
				<Grid>{currentselect.id}</Grid>
				<Grid>
					<IdeaTabsNav SetideaNavTab={SetideaNavTab} ideaNavTab={ideaNavTab} />
				</Grid>
				<Grid>
					{ideaNavTab == 'capture' ? (
						<IdeaCapture
							SetideaNavTab={SetideaNavTab}
							ideaNavTab={ideaNavTab}
							saveData={saveData}
							setAttributes={setAttributes}
							attributes={attributes}
						/>
					) : ideaNavTab == 'refine' ? (
						<IdeaRefine
							saveData={saveData}
							setAttributes={setAttributes}
							attributes={attributes}
						/>
					) : ideaNavTab == 'validate' ? (
						<IdeaValidate
							saveData={saveData}
							setAttributes={setAttributes}
							attributes={attributes}
						/>
					) : ideaNavTab == 'finalize' ? (
						<IdeaFinalize
							saveData={saveData}
							setAttributes={setAttributes}
							attributes={attributes}
						/>
					) : null}
					{/* <IdeaCapture /> */}
				</Grid>
			</Box>
		</>
	);
}

IdeaFlowPlaceholder.propTypes = {
	SetideaNav: PropTypes.func,
	currentselect: PropTypes.object,
	deleteIdea: PropTypes.func,
};
