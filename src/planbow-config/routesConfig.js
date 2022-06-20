import React,{ useEffect } from 'react';
import { Routes, Route, Outlet, Link,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '@components/Login/Login';
import Invite from '@components/Invite';
import Dashboard from '@components/Dashboard/Dashboard.js';
import PlanboardDesigner from '../components/PlanboardDesigner';
import PlanboardComponents from '../components/PlanboardComponents';
import { PlanboardDesignerProvider } from '../contexts/planboardDesigner';

export default function App() {
	const {user:User}=useSelector(state=>state);
	const navigate=useNavigate();
	useEffect(() => {
		if (!User?.email) {
			navigate('/');
		};
	}, []);
	return (
		<div>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Login />} />
					<Route
						path='planboard-designer'
						element={
							<PlanboardDesignerProvider>
								<PlanboardDesigner />
							</PlanboardDesignerProvider>
						}
					/>
					<Route path='login' element={<Login />} />
					<Route path='invite' element={<Invite />} />
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
	return <Outlet />;
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
