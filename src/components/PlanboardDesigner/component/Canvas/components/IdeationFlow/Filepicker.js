import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
	Box,
	Typography,
	LinearProgress,
	IconButton,
	Grid,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
// import { LoadingButton } from '@mui/lab';
// import Upload from './images/upload.png';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const Filepicker = () => {
	const [files, setFiles] = useState([]);
	const [state, setState] = useState({
		loading: false,
	});
	const onDrop = useCallback((accFiles) => {
		const mappedAcc = accFiles.map((file) => ({
			id: uuidv4(),
			file,
			localURL: URL.createObjectURL(file),
			progress: 0,
			status: 'none',
		}));
		setFiles((curr) => [...curr, ...mappedAcc]);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const onSubmit = () => {
		setState({ loading: true });
		files.map(async (item) => {
			if (item.progress === 0) await uploadFile(item);
		});
	};

	const uploadFile = async (item) => {
		let formData = new FormData();
		formData.append('caption', item.file.name + new Date());
		formData.append('file', item.file);
		console.log(formData);

		await axios
			.post(`${process.env.REACT_APP_URL}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const progress =
						(progressEvent.loaded / progressEvent.total) * 50 * 2;
					console.log({ id: item.id, progress });
					updateProgress(item.id, progress);
				},
			})
			.then((response) => {
				response.data.success
					? updateStatus(item.id, 'done')
					: updateStatus(item.id, 'exist');
			})
			.catch((err) => alert('Error: ' + err));
	};

	const updateStatus = (id, message) => {
		setFiles((prev) => {
			return prev.map((item) => {
				if (item.id === id) return { ...item, status: message };
				else return item;
			});
		});
	};

	const updateProgress = (id, progress) => {
		setFiles((prev) => {
			return prev.map((item) => {
				if (item.id === id) return { ...item, progress };
				else return item;
			});
		});
	};

	// function formatBytes(a, b = 2, k = 1024) {
	// 	with (Math) {
	// 		let d = floor(log(a) / log(k));
	// 		return 0 == a
	// 			? '0 Bytes'
	// 			: parseFloat((a / pow(k, d)).toFixed(max(0, b))) +
	// 					' ' +
	// 					['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d];
	// 	}
	// }
	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	function getFilesize(x) {
		let l = 0,
			n = parseInt(x, 10) || 0;

		while (n >= 1024 && ++l) {
			n = n / 1024;
		}

		return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
	}

	const deleteFile = (id) => {
		setFiles((prev) => prev.filter((item) => item.id !== id));
	};

	useEffect(() => {
		let ab = true;
		files.map((item) => {
			if (item?.status) return;
			else return (ab = false);
		});
		if (ab) setState({ loading: false });
		// console.log({ a });
	}, [files]);

	return (
		<>
			<div
				{...getRootProps()}
				style={{
					position: 'relative',
					margin: 4,
				}}
			>
				<input {...getInputProps()} />
				<Box
					sx={{
						background: 'lightgrey',
						border: '2px solid grey',
						cursor: 'pointer',
					}}
				>
					<div>
						<UploadFileIcon
							style={{
								fontSize: 65,
								color: 'blueviolet',
								width: '95%',
								margin: 'auto',
							}}
						/>
						<div style={{ width: 350, margin: 'auto' }}>
							<Typography variant='h6' gutterBottom component='div'>
								Click or drag file to this area to upload
							</Typography>
						</div>
					</div>
				</Box>
				<Box>
					{files.map((item) => (
						<Box key={item.id}>
							<Box sx={{ display: 'flex', marginTop: '15px' }}>
								<Grid container>
									<Grid item xs={12}>
										File Name:{item.file.name}
									</Grid>
									<Grid item xs={6}>
										File Size:{getFilesize(item.file.size)}
									</Grid>
									<Grid item xs={6}>
										File Type:{item.file.type}
									</Grid>
								</Grid>

								{item?.status === 'none' ? (
									<IconButton
										color='primary'
										aria-label='Delete File'
										component='span'
										onClick={() => deleteFile(item.id)}
									>
										<DeleteOutlineIcon />
									</IconButton>
								) : null}
								{item?.status === 'done' ? (
									<IconButton
										color='primary'
										aria-label='Delete File'
										component='span'
									>
										<DoneAllIcon />
									</IconButton>
								) : null}
								{item?.status === 'exist' ? (
									<IconButton
										color='primary'
										aria-label='Delete File'
										component='span'
									>
										<ErrorOutlineIcon />
									</IconButton>
								) : null}
								{item?.status === 'none' && item.progress !== 0 ? (
									<IconButton
										color='primary'
										aria-label='Delete File'
										component='span'
									>
										<CancelIcon />
									</IconButton>
								) : null}
							</Box>
							<Box>
								{item?.status === 'done' ? (
									<>Success</>
								) : (
									<>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Box sx={{ width: '100%', mr: 1 }}>
												<LinearProgress
													variant='determinate'
													value={item.progress}
												/>
											</Box>
											<Box sx={{ minWidth: 35 }}>
												<Typography
													variant='body2'
													color='text.secondary'
												>{`${Math.round(item.progress)}%`}</Typography>
											</Box>
										</Box>
									</>
								)}
							</Box>
						</Box>
					))}
				</Box>
			</div>

			{/* <Button onClick={onSubmit}>Submit</Button> */}
			<LoadingButton
				loading={state.loading}
				onClick={onSubmit}
				variant='contained'
			>
				Submit
			</LoadingButton>

			{/* <div className='Upload'>
				<p className='Upload__Title'>Upload File</p>
				<div className='Upload__InputSection'>
					<input
						type='text'
						className='Upload__Caption'
						placeholder='Enter caption...'
						onChange={(event) =>
							setState((prev) => ({
								...prev,
								caption: event.target.value,
							}))
						}
						value={state.caption}
					/>
					<input
						type='file'
						className='Upload__Input'
						onChange={(event) => {
							setState((prev) => ({
								...prev,
								uploadedImageUrl: URL.createObjectURL(event.target.files[0]),
								uploadedImage: event.target.files[0],
							}));
						}}
					/>
				</div>

				<img
					src={!state.uploadedImageUrl.trim() ? Upload : state.uploadedImageUrl}
					alt='upload-image'
					className='Upload__Image'
					style={{
						display: 'block',
						margin: '0 auto',
						marginTop: '15px',
						width: '150px',
						height: '150px',
						border: '2px solid #e5e5e5',
						boxShadow: '2px 4px 3px #e5e5e5',
					}}
				/>

				<button onClick={uploadImage} className='Upload__Button'>
					Upload
				</button>
			</div> */}
		</>
	);
};

export default Filepicker;
