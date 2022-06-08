import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function YourIdea({
	SetideaNav,
	Setcurrentselect,
	ideas,
	setIdeas,
}) {
	const planboard = useSelector((state) => state.planboard);
	const activeComponent = useSelector(
		(state) => state.settings.planboardComponent
	);
	const planboardID = planboard._id;
	const { componentID } = activeComponent.data;

	// const [questions, setQuestions] = React.useState([]);
	// const [question, setQuestion] = React.useState({});
	const [newIdea, setNewIdea] = React.useState('');
	const [open, setOpen] = React.useState(false);

	// console.log(questions);
	// const addQuestion = () => {
	// 	let defaultData = [...questions];
	// 	if (question?.name?.length) {
	// 		defaultData.push(question);
	// 		// setQuestions(defaultData);
	// 		setQuestion({});
	// 		setOpen(false);
	// 	} else {
	// 		setOpen(true);
	// 	}
	// };

	const addIdea = async () => {
		// console.log(planboardID, componentID);
		if (newIdea?.length) {
			try {
				const response = await axios.post(
					`${process.env.REACT_APP_URL}/componentIdeas/create`,
					{
						componentID,
						planboardID,
						idea: newIdea,
					}
				);
				if (response.data?.message === 'success') {
					const newData = response.data.data;
					setIdeas([
						...ideas,
						{
							id: newData._id,
							idea: newIdea,
							date: new Date(newData.createdAt).toDateString(),
						},
					]);
					setNewIdea('');
				} else {
					console.log('Unsuccessfull');
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
	const handleClose = () => {
		setOpen(false);
	};
	const getComponentIdeas = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_URL}/componentIdeas/get?planboardID=${planboardID}&componentID=${componentID}`
			);
			if (response.data.message === 'success') {
				const ideass = [];
				response.data.data.map((item) => {
					ideass.push({
						id: item._id,
						idea: item.idea,
						date: new Date(item.createdAt).toDateString(),
						data: item.data,
					});
					return null;
				});
				setIdeas(ideass);
				console.log(ideass);
				console.log(response.data.data);
			} else {
				console.log('Unsuccessfull');
			}
		} catch (e) {
			console.log(e);
		}
	};
	React.useEffect(() => {
		getComponentIdeas();
	}, []);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				{ideas.map((data) => (
					<Grid
						onClick={() => {
							SetideaNav('ideaplaceholder');
							Setcurrentselect(data);
						}}
						item
						xs={12}
						key={data.id}
					>
						<Item>{data.idea}</Item>
					</Grid>
				))}

				<Grid item xs={12}>
					<TextField
						id='standard-basic'
						onChange={(e) =>
							// setQuestion({ id: new Date().getTime(), name: e.target.value })
							setNewIdea(e.target.value)
						}
						// value={question.name || ''}
						value={newIdea || ''}
						label='Standard'
						variant='standard'
						error=''
					/>
				</Grid>
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
					message='Note archived'
					// action={action}
				/>

				<Grid item xs={12}>
					<Button
						// onClick={() => addQuestion()}
						onClick={addIdea}
						variant='outlined'
					>
						Add Ideas
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

YourIdea.propTypes = {
	SetideaNav: PropTypes.func,
	Setcurrentselect: PropTypes.func,
	ideas: PropTypes.array,
	setIdeas: PropTypes.func,
	// selectedNav: PropTypes.string,
};
