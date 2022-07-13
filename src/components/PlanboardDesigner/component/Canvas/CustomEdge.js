import React from 'react';
import { getBezierPath, getEdgeCenter } from 'react-flow-renderer';
import './customEdge.css';
import PropTypes from 'prop-types';

const foreignObjectSize = 40;

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	data,
	markerEnd,
}) {
	const edgePath = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});
	const [edgeCenterX, edgeCenterY] = getEdgeCenter({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});
	const onEdgeClick = (evt, id) => {
		evt.stopPropagation();
		console.log(id);
		// alert(`remove ${id}`);
		data.delete = true;
	};

	return (
		<>
			{/* <path
				style={style}
				className='react-flow__edge-path-selector'
				d={edgePath}
				markerEnd={markerEnd}
				fillRule='evenodd'
			/> */}
			<path
				id={id}
				style={style}
				className='react-flow__edge-path'
				d={edgePath}
				markerEnd={markerEnd}
			/>
			<foreignObject
				width={foreignObjectSize}
				height={foreignObjectSize}
				x={edgeCenterX - foreignObjectSize / 2}
				y={edgeCenterY - foreignObjectSize / 2}
				className='edgebutton-foreignobject'
				requiredExtensions='http://www.w3.org/1999/xhtml'
			>
				<body>
					<button
						className='edgebutton'
						onClick={(event) => onEdgeClick(event, id)}
					>
						×
					</button>
				</body>
			</foreignObject>
			{/* <text>
				<textPath
					href={`#${id}`}
					style={{ fontSize: '12px' }}
					startOffset='50%'
					textAnchor='middle'
				>
					{data.text}
				</textPath>
			</text> */}
		</>
	);
}
CustomEdge.propTypes = {
	id: PropTypes.any,
	sourceX: PropTypes.any,
	sourceY: PropTypes.any,
	targetX: PropTypes.any,
	targetY: PropTypes.any,
	sourcePosition: PropTypes.any,
	targetPosition: PropTypes.any,
	style: PropTypes.any,
	data: PropTypes.any,
	markerEnd: PropTypes.any,
};
