import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Typography } from '@mui/material';
const Filepicker = () => {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((accFiles, rejFiles) => {
		const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
		setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} style={{background:'lightgrey',position:'relative',margin:4,border:'2px solid grey',cursor:'pointer'}}>
			<input {...getInputProps()} />
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
			{JSON.stringify(files)}
		</div>
	);
};

export default Filepicker;
