import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
	{ id: 'userName', label: 'UserName', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 100 },
	{
		id: 'role',
		label: 'Role',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toUpperCase(),
	},
	{
		id: 'createdOn',
		label: 'Created On',
		minWidth: 170,
		align: 'right',
		// format: (value) => value('en-US'),
	},
];

function createData(userName, email, role, createdOn) {
	return { userName, email, role, createdOn };
}

const rows = [
	createData('India', 'IN', 'Admin', new Date().toDateString('en-US')),
	createData('China', 'CN', 'Admin', new Date().toDateString('en-US')),
	createData('Italy', 'IT', 'Admin', new Date().toDateString('en-US')),
	createData('United States', 'US', 'Admin', new Date().toDateString('en-US')),
	createData('Canada', 'CA', 'Contributor', new Date().toDateString('en-US')),
	createData('Australia', 'AU', 'Contributor', new Date().toDateString('en-US')),
	createData('Germany', 'DE', 'Contributor', new Date().toDateString('en-US')),
	createData('Ireland', 'IE', 'Contributor', new Date().toDateString('en-US')),
	createData('Mexico', 'MX', 'Contributor', new Date().toDateString('en-US')),
	createData('Japan', 'JP', 'Contributor', new Date().toDateString('en-US')),
	createData('France', 'FR', 'Admin', new Date().toDateString('en-US')),
	createData('United Kingdom', 'GB', new Date().toDateString('en-US')),
	createData('Russia', 'RU', 'Admin', new Date().toDateString('en-US')),
	createData('Nigeria', 'NG', 'Admin', new Date().toDateString('en-US')),
	createData('Brazil', 'BR', 'Admin', new Date().toDateString('en-US')),
];

export default function TeamsComponent() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
