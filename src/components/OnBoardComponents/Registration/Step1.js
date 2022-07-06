import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Icon,
	Link,
	Stack,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axiosRequests from '@utils/axiosRequests';
import { LoadingButton } from '@mui/lab';
import { mdiFacebook, mdiGoogle } from '@mdi/js';

const Step1 = ({ setOnboardNav, whiteBoxCenter, socialIcon }) => {
	const [loading, setLoading] = useState(false);
	const initialValues = {
		email: '',
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Enter valid email').required('Required'),
	});
	const handleSubmit = async (values, props) => {
		setLoading(true);
		const response = await axiosRequests.postData('/register/step-1', {
			email: values.email,
		});
		setLoading(false);
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
		<Container
			maxWidth='xs'
			sx={{
				...whiteBoxCenter,
				position: 'relative',
				top: 30,
				left: 0,
				transform: 'inherit',
			}}
		>
			<Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						m: '10px 0',
					}}
				>
					<Stack direction='row' spacing={2} sx={{ ...socialIcon }}>
						<Button
							variant='outlined'
							startIcon={
								<Icon
									path={mdiGoogle}
									color='#4285f4'
									title='Google'
									size={1}
								/>
							}
						>
							Google
						</Button>
						<Button
							variant='outlined'
							startIcon={
								<Icon
									path={mdiFacebook}
									color='#4867aa'
									title='Facebook'
									size={1}
								/>
							}
						>
							Facebook
						</Button>
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
							<LoadingButton
								loading={loading}
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
							>
								Submit
							</LoadingButton>
						</Form>
					)}
				</Formik>
				<Grid container>
					<Grid item xs />
					<Grid item>
						<Link
							variant='body2'
							onClick={(e) => {
								e.stopPropagation();
								e.nativeEvent.stopImmediatePropagation();
								setOnboardNav('login');
							}}
							sx={{ cursor: 'pointer' }}
						>
							Have an account? Sign In
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Step1;

Step1.propTypes = {
	resetForm: PropTypes.object,
	setSubmitting: PropTypes.object,
	setOnboardNav: PropTypes.func,
	whiteBoxCenter: PropTypes.object,
	socialIcon: PropTypes.object,
};
