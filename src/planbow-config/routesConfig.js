import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Login from '@components/Login/Login';
import Dashboard from '@components/Dashboard/Dashboard.js';
import Ideation from '../components/IdeationComponent';
import PlanboardComponents from '../components/PlanboardComponents';


export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Login />} />
					<Route path='ideation' element={<Ideation />} />
					<Route path='login' element={<Login />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='planboard' element={<PlanboardComponents />} />

					{/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
					<Route path='*' element={<NoMatch />} />
				</Route>
			</Routes>
		</div>
	);
}

function Layout() {
	return (
		<Outlet />
	);
}

// function Home() {
// 	return (
// 		<div>
// 			<h2>Home</h2>
// 		</div>
// 	);
// }

function NoMatch() {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to='/'>Go to the home page</Link>
			</p>
		</div>
	);
}
