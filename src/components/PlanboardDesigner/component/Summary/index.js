import React from 'react';
import { incNumber } from '@redux/actions';
import { decNumber } from '@redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import IdeationFlow from '../IdeationFlow';

export default function IdeationSummary() {
	const changeTheNumber = useSelector((state) => state.updown);
	console.log(changeTheNumber);

	const dispatch = useDispatch();
	return (
		<>
			<IdeationFlow />
			<div className='main-div'>
				<div className='container'>
					<h1>Increment/Decrement counter</h1>
					<h4>using React and Redux</h4>

					<div className='quantity'>
						<a
							className='quantity__minus'
							title='Decrement'
							onClick={() => dispatch(decNumber())}
						>
							<span>-</span>
						</a>
						<input
							name='quantity'
							type='text'
							className='quantity__input'
							readOnly
							value={changeTheNumber}
						/>
						<a
							className='quantity__plus'
							title='Increment'
							onClick={() => dispatch(incNumber(1))}
						>
							<span>+</span>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
