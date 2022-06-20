import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Login from '@components/Login/Login';
import Invite from '@components/Invite';
import Dashboard from '@components/Dashboard/Dashboard.js';
import PlanboardDesigner from '../components/PlanboardDesigner';
import PlanboardComponents from '../components/PlanboardComponents';
import { PlanboardDesignerProvider } from '../contexts/planboardDesigner';
import Registration from '../components/Registration';
import Workspace from '../components/Workspace';
import Colleagues from '../components/Colleagues';
import OnBoardComponents from '../components/OnBoardComponents';


export default function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<OnBoardComponents />} />
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

					{/* we need to remove this route */}
					<Route path='registration' element={<Registration />} />
					<Route path='workspace' element={<Workspace />} />
					<Route path='colleagues' element={<Colleagues />} />

					
					{/* we need to remove this route */}
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
