import { createTheme, hexToRgb } from '@mui/material/styles';

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 428,
			md: 1024,
			lg: 1440,
			xl: 1920,
		},
	},
	// overrides: {
	// 	MuiCssBaseline: {
	// 		'@global': {
	// 			body: {
	// 				backgroundSize: '8px 8px',
	// 				backgroundImage:
	// 					'linear-gradient( to right, #e8e8e8 1px, transparent 1px ), linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)',
	// 				height: '100vh',
	// 			},
	// 		},
	// 	},
	// },
	palette: {
		background: {
			backgroundSize: '8px 8px',
			backgroundImage:
				'linear-gradient( to right, #e8e8e8 1px, transparent 1px ), linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)',
		},
		primary: {
			main: '#000000',
		},
		secondary: {
			main: '#ffffff',
		},
		transparent: {
			transparent: 'transparent',
		},
		amber: {
			main: '#ffc200',
		},
		ebonyClay: {
			main: '#222835',
		},
		pattensBlue: {
			main: '#d4ebff',
		},
		watusi: {
			main: '#ffe0d4',
		},
		cream: {
			main: '#fffcd4',
		},
		mischka: {
			main: '#dde0e6',
		},
		mischka50: {
			main: hexToRgb('#dde0e680'),
		},
		athensGray: {
			main: '#eef0f3',
		},
		aquamarineBlue: {
			main: '#64ded6',
		},
		riptide: {
			main: '#7fedb9',
		},
		wildSand: {
			main: '#f6f6f6',
		},
		white: {
			main: '#fefefe',
		},
		porcelain: {
			main: '#f2f3f4',
		},
		albaster: {
			main: '#f8f8f8',
		},
		shuttleGray: {
			main: '#626b7a',
		},
		gullGray: {
			main: '#93a5b6',
		},
		dodgerBlue: {
			main: '#1987ff',
		},
	},
	components: {
		MuiTypography: {
			styleOverrides:{
				mainTitle: ({ theme }) => ({
					// padding: theme.spacing(0, 1),
					color: theme.palette.primary.main,
					// fontSize: '1.2rem',
					// textTransform: 'uppercase'
				}),
				subContent: ({theme}) => ({
					color: theme.palette.gullGray.main,
					fontSize: '14px'
				})
			}
		},
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: Number(theme.shape.borderRadius) * 1.25,
					// padding: theme.spacing(3, 3),
					// height: 30,
				}),
				containedSecondary: ({ theme }) => ({
					boxShadow: theme.shadows[3],
					'&:hover': {
						backgroundColor: theme.palette.white.main,
					},
				}),
				containedPrimary: ({ theme }) => ({
					boxShadow: theme.shadows[3],
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.secondary.main,
					'&:hover': {
						backgroundColor: theme.palette.primary.main,
					},
				}),
				containedLink: ({ theme }) => ({
					borderRadius: Number(theme.shape.borderRadius) * 1.25,
					padding: theme.spacing(0, 1),
					color: theme.palette.amber.main,
					fontSize: '12px',
				}),
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: () => ({
					borderRadius: '0.3em',
					'& input': {
						// height: '20px',
						// padding: '5px 14px'
					},
				}),
			},
		},
		MuiTreeItem: {
			styleOverrides: {
				root: () => ({
					'& .MuiTreeItem-content': {
						padding: '10px 8px',
					},
				}),
			},
		},
		// MuiPaper: {
		// 	styleOverrides: {
		// 		root: () =>({
		// 			padding:'1rem',
		// 		})
		// 	}
		// }
	},
});

export default theme;
