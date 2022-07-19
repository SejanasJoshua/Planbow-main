import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Filepicker = () => {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback((accFiles, rejFiles) => {
		const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
		setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
	}, []);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<p>Drag & drop some files here, or click to select files</p>
			{JSON.stringify(files)}
		</div>
	);
};

export default Filepicker;
