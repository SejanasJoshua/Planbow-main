import React from 'react';
import IdeationFlow from '../IdeationFlow';
import PropTypes from 'prop-types';
import LeftPanel from './LeftPanel';
export default function IdeationSummary(props) {
	return (
		<>
			<IdeationFlow />
			<div
				className='main-div'
				style={{ padding: '20px', margin: '50px 25px' }}
			>
				<LeftPanel {...props} />
			</div>
		</>
	);
}
IdeationSummary.propTypes = {
	creator: PropTypes.object,
};
