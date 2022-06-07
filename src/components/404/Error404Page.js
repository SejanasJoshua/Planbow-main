import React from 'react';
import { Link } from 'react-router-dom';

export default function Error404Page() {
	return (
		<div>
			<h1>Error404Page</h1>
			<Link  to="/">
                Go back to dashboard
			</Link>
		</div>
	);
}
