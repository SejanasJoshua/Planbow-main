import {
	Box,
	Button,
	Container,
	Divider,
	Stack,
	TextField,
} from '@mui/material';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axiosRequests from '@utils/axiosRequests';

const Step1 = () => {
	const initialValues = {
		email: '',
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Enter valid email').required('Required'),
	});
	const handleSubmit = async (values, props) => {
		const response = await axiosRequests.postData('/register/step-1', {
			email: values.email,
		});
		setTimeout(() => {
			props.resetForm();
			props.setSubmitting(false);
		}, 2000);
		console.log(response);
		if (response.data.message === 'email sent') {
			alert('Verify Email');
		} else {
			alert(response.data.message);
			console.log(response.data);
		}
	};

	return (
		<Container>
			<Box sx={{ height: '100vh' }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						m: '10px 0',
					}}
				>
					<Stack direction='row' spacing={2}>
						<Button variant='outlined'>Google</Button>
						<Button variant='outlined'>Facebook</Button>
					</Stack>
				</Box>
				<Divider>OR</Divider>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<Field
								as={TextField}
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								autoFocus
								size='small'
								helperText={<ErrorMessage name='email' />}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default Step1;

Step1.propTypes = {
	resetForm: PropTypes.object,
	setSubmitting: PropTypes.object,
};
