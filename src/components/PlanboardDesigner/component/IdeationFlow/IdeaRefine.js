import React, { useState, useEffect } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	Box,
	Grid,
	Card,
	CardHeader,
	// Avatar,
	CardContent,
	CardActions,
	IconButton,
	// Typography,
	TextareaAutosize,
} from '@mui/material';
// import ArrowDropDown from '@mui/icons-material/ArrowDropDownOutlined';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import AddCardIcon from '@mui/icons-material/AddCardOutlined';
import { Refine } from '@data/IdeationAttributes';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function IdeaRefine({ attributes, setAttributes, saveData }) {
	const [attributesData, setAttributesData] = useState(Refine);
	const [errors, setErrors] = useState([]);
	const [attributeMenu, setAttributeMenu] = useState(null);
	const [clickedAttribute, setClickedAttribute] = useState(null);
	const [whenToSave, setWhenToSave] = useState(0);
	const openAttributeMenu = Boolean(attributeMenu);
	const handleAttributeClick = (event) => {
		setAttributeMenu(event.currentTarget);
	};
	const handleClose = () => {
		setAttributeMenu(null);
	};

	const handleDeleteAttribute = () => {
		if (clickedAttribute.type !== 'custom') {
			alert('cannot delete');
		} else {
			const newData = attributesData.custom.filter(
				(elem) => elem._id !== clickedAttribute._id
			);
			setAttributesData({
				...attributesData,
				custom: [...newData],
			});
		}
		setAttributeMenu(null);
		saveData();
	};
	const checkDuplicateTitle = (id, title) => {
		attributesData?.map((item) => {
			if (item._id !== id) {
				if (item.title === title) {
					if (item.type === 'custom') {
						return setErrors([
							...errors,
							{
								id,
								error: 'Attribute with same Name already Exists',
							},
						]);
					} else {
						return setErrors([
							...errors,
							{
								id,
								error: 'Pre Defined Attribute Exists',
							},
						]);
					}
				}
			}
			return null;
		});
		errors?.map((item) => {
			if (item.title !== title) {
				const results = errors.filter((obj1) => {
					return !obj1.id === id;
				});
				setErrors(results);
			}
			return null;
		});
		// attributesData?.map((item) => {
		// 	if (item.id !== id) {
		// 		if (item.title === title) {
		// 			return setErrors([
		// 				...errors,
		// 				{
		// 					id,
		// 					error: 'Attribute with same Name already Exists',
		// 				},
		// 			]);
		// 		}
		// 	}
		// 	return null;
		// });
	};
	const handleUp = () => {};
	const handleDown = () => {};
	const handleInputChange = (id, event) => {
		// checkDuplicateTitle(id, event.target.value);
		const newAttributeDescriptions = attributesData.map((item) => {
			if (id === item._id) {
				// i[event.target.description] = event.target.value;
				item.description = event.target.value;
			}
			return item;
		});
		console.log(id);
		console.log(newAttributeDescriptions);
		setAttributesData(newAttributeDescriptions);
		setWhenToSave(whenToSave + 1);
		if (whenToSave === 5) {
			saveData();
			setWhenToSave(0);
		}
	};
	const addAttribute = () => {
		setAttributesData([
			...attributesData,
			// custom: [
			// 	...attributesData.custom,
			{
				_id: uuidv4(),
				type: 'custom',
			},
			// ],
		]);
		saveData();
	};
	const handleTitleChange = (id, event) => {
		const newAttributeTitle = attributesData.map((item) => {
			if (id === item._id) {
				item.title = event.target.value;
			}
			return item;
		});
		checkDuplicateTitle(id, event.target.value);
		setAttributesData(newAttributeTitle);
	};
	const handleSubtitleChange = (id, event) => {
		const newAttributeSubtitle = attributesData.map((item) => {
			if (id === item._id) {
				item.subtitle = event.target.value;
			}
			return item;
		});
		setAttributesData(newAttributeSubtitle);
	};

	useEffect(() => {
		console.log(attributesData);
		setAttributes({
			...attributes,
			refine: attributesData,
		});
	}, [attributesData]);
	useEffect(() => {
		attributes?.refine && setAttributesData(attributes.refine);
	}, []);

	return (
		<Box>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item sm={12} md={8}></Grid>
				{attributesData.map((attribute, index) => (
					<Grid
						item
						sm={12}
						key={attribute._id}
						onClick={() => setClickedAttribute(attribute)}
					>
						<Card sx={{ width: '100%', margin: '10px' }}>
							<CardHeader
								action={
									<>
										<IconButton
											id={`attribute-card-button${index}`}
											aria-controls={
												openAttributeMenu
													? `attribute-card-menu${index}`
													: undefined
											}
											aria-haspopup='true'
											aria-expanded={openAttributeMenu ? 'true' : undefined}
											onClick={(event) => {
												handleAttributeClick(event, attribute);
											}}
										>
											<MoreHorizIcon />
										</IconButton>
										<Menu
											id={`attribute-card-menu${index}`}
											anchorEl={attributeMenu}
											open={openAttributeMenu}
											onClose={handleClose}
											MenuListProps={{
												'aria-labelledby': `attribute-card-button${index}`,
											}}
										>
											<MenuItem onClick={handleDeleteAttribute}>
												Delete
											</MenuItem>
											<MenuItem onClick={handleClose}>Favourites</MenuItem>
											<MenuItem onClick={() => handleUp(index)}>
												Move Up
											</MenuItem>
											<MenuItem onClick={() => handleDown(index)}>
												Move Down
											</MenuItem>
											<MenuItem onClick={handleClose}>Status</MenuItem>
											<MenuItem onClick={handleClose}>Lock</MenuItem>
										</Menu>
									</>
								}
								title={
									attribute.type === 'custom' ? (
										<>
											<TextareaAutosize
												placeholder='Title'
												required
												onChange={(event) =>
													handleTitleChange(attribute._id, event)
												}
												value={attribute.title}
												style={{
													resize: 'none',
													width: '75%',
													border: 'none',
													fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
													fontSize: '1.5rem',
													lineHeight: '1.334',
													fontWeight: '400',
												}}
											/>
											{errors?.map((item) => {
												if (item.id === attribute._id) {
													return (
														<p
															key={item.id}
															style={{
																color: 'rgb(185 28 28)',
																paddingLeft: '4px',
																fontFamily:
																	'"Roboto","Helvetica","Arial",sans-serif',
																fontSize: '1rem',
																lineHeight: '1.334',
																fontWeight: '400',
															}}
														>
															{item.error}
														</p>
													);
												}
												return null;
											})}
										</>
									) : (
										attribute.title
									)
								}
								subheader={
									attribute.type === 'custom' ? (
										<TextareaAutosize
											placeholder='Subtitle'
											required
											rows={1}
											onChange={(event) =>
												handleSubtitleChange(attribute._id, event)
											}
											value={attribute.subtitle}
											style={{
												resize: 'none',
												border: 'none',
												width: '75%',
												fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
												fontSize: '1rem',
												lineHeight: '1.5',
												fontWeight: '400',
												color: 'rgba(0, 0, 0, 0.6)',
											}}
										/>
									) : (
										attribute.subtitle
									)
								}
							/>
							<CardContent sx={{ display: 'flex' }}>
								<textarea
									rows={5}
									placeholder='Description'
									onChange={(event) => handleInputChange(attribute._id, event)}
									value={attribute.description}
									style={{
										border: '1px solid #bfbfbf',
										width: '100%',
										margin: '0 10px',
										borderRadius: '10px',
										padding: '1px',
									}}
								/>
							</CardContent>
							<CardActions disableSpacing>
								<Button variant='text' startIcon={<AddIcon />}>
									Add Block
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
				<Grid
					item
					sm={12}
					sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
				>
					<Button
						variant='outlined'
						startIcon={<AddCardIcon />}
						onClick={addAttribute}
					>
						Add Attribute
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
IdeaRefine.propTypes = {
	attributes: PropTypes.object,
	setAttributes: PropTypes.func,
	saveData: PropTypes.func,
};
