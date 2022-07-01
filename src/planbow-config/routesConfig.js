import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Invite from '@components/Invite';
import Dashboard from '@components/Dashboard/Dashboard.js';
import PlanboardDesigner from '../components/PlanboardDesigner';
import PlanboardComponents from '../components/PlanboardComponents';
import { PlanboardDesignerProvider } from '../contexts/planboardDesigner';
import Registration from '../components/OnBoardComponents/Registration';
import Workspace from '../components/Workspace';
import Colleagues from '../components/Colleagues';
import OnBoardComponents from '../components/OnBoardComponents';
import Logout from '@components/Logout/Logout';
import ResetPassword from '../components/OnBoardComponents/ResetPassword';
import ForgotPassword from '../components/OnBoardComponents/ForgotPassword';
import TeamsComponent from '../components/TeamsComponent';
import RecycleBin from '../components/RecycleBin';
import MasterLayoutComponent from '@components/MasterLayoutComponent';

export default function App() {
	const { user: User } = useSelector((state) => state);

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
					<Route path='login' element={<OnBoardComponents />} />
					<Route path='home' element={<MasterLayoutComponent />} />
					<Route
						path='logout'
						element={User ? <Logout /> : <OnBoardComponents />}
					/>
					<Route path='invite' element={<Invite />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password/:id/:token' element={<ResetPassword />} />

					{/* we need to remove this route */}
					<Route path='registration' element={<Registration />} />
					<Route path='workspace' element={<Workspace />} />
					<Route path='colleagues' element={<Colleagues />} />

					{/* we need to remove this route */}
					<Route
						path='dashboard'
						element={
							<MasterLayoutComponent>
								<Dashboard />
							</MasterLayoutComponent>
						}
					/>
					<Route
						path='planboard'
						element={
							<MasterLayoutComponent>
								<PlanboardComponents />
							</MasterLayoutComponent>
						}
					/>
					<Route
						path='bin'
						element={
							<MasterLayoutComponent>
								<RecycleBin />
							</MasterLayoutComponent>
						}
					/>

					{/* teams route  */}
					<Route
						path='teams'
						element={
							<MasterLayoutComponent>
								<TeamsComponent />
							</MasterLayoutComponent>
						}
					/>

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
