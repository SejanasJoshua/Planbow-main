import React from 'react';
import Login from '../Login/Login';
import Registration from '../Registration';
import Box from '@mui/material/Box';

const bg = {
	backgroundSize: '8px 8px',
	backgroundImage:
		'linear-gradient( to right, #e8e8e8 1px, transparent 1px ), linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)',
	height: '100vh',
	// boxShadow: '0px 7px 29px 0px #ddd',
};

const socialIcon = {
	width: '100%',
	'& button': {
		width: '100%',
	},
};

const whiteBoxCenter = {
	background: (theme) => `${theme.palette.secondary.main}`,
	border: (theme) => `1px solid ${theme.palette.primary.main}`,
	borderRadius: (theme) => Number(theme.shape.borderRadius) * 0.5,
	py: 2,
	position: 'absolute',
	top: '50%;',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

export default function OnBoardComponents() {
	const [onboardNav, setOnboardNav] = React.useState('login');
	return (
		<Box sx={{ ...bg }}>
			{onboardNav === 'login' ? (
				<Login setOnboardNav={setOnboardNav} socialIcon={socialIcon} whiteBoxCenter={whiteBoxCenter} />
			) : onboardNav === 'registration' ? (
				<Registration setOnboardNav={setOnboardNav} socialIcon={socialIcon} whiteBoxCenter={whiteBoxCenter} />
			) : null}
		</Box>
	);
}
