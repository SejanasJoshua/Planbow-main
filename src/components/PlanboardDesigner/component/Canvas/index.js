/*eslint-disable */
import React, {
	useState,
	useEffect,
	useCallback,
	useContext,
	useRef,
} from 'react';
import ReactFlow, {
	ReactFlowProvider,
	MiniMap,
	addEdge,
	useNodesState,
	useEdgesState,
} from 'react-flow-renderer';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import {
	updatePlanboardCanvas,
	updatePlanboardComponent,
} from '@redux/actions';
import axiosRequests from '@utils/axiosRequests';

import StartNode from './StartNode';
import CustomNode from './CustomNode';
import AllComponentsList from './AllComponentsList';
import PlanboardDesignerContext from '@contexts/planboardDesigner';

// const bg = {
// 	backgroundSize: '8px 8px',
// 	backgroundImage:
// 		'linear-gradient( to right, #e8e8e8 1px, transparent 1px ), linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)',
// 	height: '100vh',
// };

const connectionLineStyle = { stroke: '#1A192B' };
const getId = () => `node_${new Date().toJSON()}`;

const initialNodes = [
	{
		id: '99',
		type: 'start',
		data: { label: 'Start', sourcePosition: 'right' },
		style: {
			background: '#fff',
			padding: 10,
			width: '100px',
			minHeight: 'auto',
			color: '#5447C8',
			borderRadius: '5px',
			boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%)',
			border: '1px solid #dad9d9',
		},
		position: { x: 500, y: 100 },
	},
];
const initialEdges = [];
const nodeTypes = {
	newNode: CustomNode,
	start: StartNode,
};

let nodeData;
let clickedNode = null;
// let clickedEdge = null;

export default function Canvas() {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [flowInstance, setFlowInstance] = useState(null);
	const planboard = useSelector((state) => state.planboard);
	const user = useSelector((state) => state.user._id);

	const { setSelectedPlanboardComponent } = useContext(
		PlanboardDesignerContext
	);

	const dispatch = useDispatch();

	const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

	const onClickNode = useCallback((event, element) => {
		clickedNode = element;
		console.log(flowInstance);
		dispatch(updatePlanboardComponent(element));
		setSelectedPlanboardComponent(element);
	}, []);
	const onClickEdge = useCallback((event, element) => {
		// clickedEdge = element;
		console.log(event, element);
	}, []);

	const checkNodeDelete = (deletedNode) => {
		if (deletedNode?.[0]?.type === 'start') {
			return setTimeout(() => setNodes([...nodes, ...deletedNode]), 0);
		}
	};
	const checkEdgeDelete = (deletedEdge) => {
		let updatedEdges = edges.filter(
			(edge) => edge.target !== deletedEdge[0].target
		);
		if (clickedNode?.id == '99') {
			return setTimeout(() => setEdges([...edges]), 0);
		}
		setTimeout(() => setEdges([...updatedEdges]), 0);
	};

	const onSave = useCallback(async () => {
		// const saveFlow = async () => {
		try {
			const response = await axiosRequests.putData('/planboard/update', {
				planboardID: planboard._id,
				canvas: nodeData,
			});
			if (response.data.message === 'success') {
				dispatch(updatePlanboardCanvas(nodeData));
				// alertMessage('Saved', 'info');
				// alert('saved');
			} else {
				alert('Save Error');
				// alertMessage('Save Error!', 'error');
			}
		} catch (e) {
			console.log(e);
		}
		// };
		// saveFlow();
	}, [flowInstance]);

	const addNodes = (data) => {
		let source = clickedNode.id;
		let count = 0;
		data.map(async (item) => {
			if (item) {
				const nodeDetails = {
					componentID: item._id,
					_id: getId(),
					name: item.name,
				};
				const componentDBdetails = await saveComponent(nodeDetails);
				count++;
				const newNode = {
					id: nodeDetails._id,
					type: 'newNode',
					position: {
						x: clickedNode.position.x + 500 * count,
						y: clickedNode.position.y,
					},
					data: {
						label: nodeDetails.name,
						componentID: componentDBdetails._id,
						icon: item.icon,
						sourcePosition: 'right',
						targetPosition: 'left',
					},
					style: {
						// width: '300px',
						color: '#000',
					},
				};
				setNodes((es) => es.concat(newNode));
				const newEdge = {
					id: `reactflow__edge-${source}-${nodeDetails._id}`,
					source: source,
					target: nodeDetails._id,
					animated: true,
					type: 'buttonedge',
					style: { stroke: '#1A192B' },
					data: { delete: false },
				};
				setEdges((es) => es.concat(newEdge));
				// let d = {
				// 	nodes: [...nodes, newNode],
				// 	edges: [...edges, newEdge],
				// };
				// dispatch(updatePlanboardCanvas(d));
				source = nodeDetails._id; // update source with new node created
			}
		});
	};

	const saveComponent = async (nodeDetails) => {
		try {
			const response = await axiosRequests.postData(
				'/planboardComponent/create',
				{
					id: nodeDetails._id,
					name: nodeDetails.name,
					componentID: nodeDetails.componentID,
					planboardID: planboard._id,
					createdBy: user,
				}
			);
			if (response.data.message === 'success') {
				onSave();
				return response.data.data;
			}
		} catch (e) {
			console.log(e);
		}
		return null;
	};

	const deleteNodes = () => {
		const deletennn = nodes.filter((item) => item.data.delete !== true);
		if (nodes.length !== deletennn.length) setNodes(deletennn);
	};
	const deleteEdges = () => {
		const deletennn = edges.filter((item) => item.data?.delete !== true);
		if (edges.length !== deletennn.length) setEdges(deletennn);
	};

	useEffect(() => {
		// console.log(nodes);
		deleteNodes();
		const compare1 = initialNodes.map((node) => {
			return node.id;
		});
		const compare = nodes.map((node) => {
			return node.id;
		});
		if (compare1 !== compare && nodes.length > 1) onSave();
	}, [nodes]);
	useEffect(() => {
		deleteEdges();
		if (edges !== initialEdges && edges.length > 0) onSave();
	}, [edges]);
	// useEffect(() => {
	// 	if (planboard.canvas) {
	// 		setNodes(planboard.canvas.nodes || []);
	// 		setEdges(planboard.canvas.edges || []);
	// 	}
	// }, [planboard]);
	const getCanvasData = async () => {
		const response = await axiosRequests.getData(
			`/planboard/get?planboard=${planboard._id}`
		);
		const { canvas } = response.data.data;
		setNodes(canvas?.nodes || initialNodes);
		setEdges(canvas?.edges || initialEdges);
	};

	useEffect(() => {
		if (planboard._id) {
			try {
				getCanvasData();
			} catch (e) {
				console.log(e);
			}
		}
	}, [planboard]);

	nodeData = { nodes: nodes, edges: edges };
	return (
		<ReactFlowProvider>
			<Grid
				container
				sx={{
					flexGrow: 1,
					height: '100vh',
					width: '100%',
					// ...bg,
				}}
			>
				<ReactFlow
					id='reactFlow'
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onKeyDown={function (e) {
						if (true) {
							console.log(e, 'reactflow');
						}
					}}
					deleteKeyCode='Backspace'
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					connectionLineStyle={connectionLineStyle}
					onNodeClick={onClickNode}
					onEdgeClick={onClickEdge}
					// onNodeDoubleClick={(n) => loadComponentonDoubleClick(n)}
					minZoom={0.35}
					onInit={setFlowInstance}
					onNodesDelete={checkNodeDelete}
					onEdgesDelete={checkEdgeDelete}
					// -----------------new Attributes------------------------------------------------
					// elementsSelectable={true}
					// nodesConnectable={true}
					// nodesDraggable={true}
					// zoomOnScroll={true}
					panOnScroll={true}
					panOnScrollMode={'free'}
					// zoomOnDoubleClick={false}
					// panOnDrag={true}
					fitView
					maxZoom={1}
				>
					<MiniMap
						nodeColor={(node_) => {
							switch (node_.type) {
								case 'input':
									return 'red';
								case 'default':
									return '#00ff00';
								case 'output':
									return 'rgb(0,0,255)';
								default:
									return '#eee';
							}
						}}
					/>
				</ReactFlow>
			</Grid>
			<AllComponentsList
				addNodes={addNodes}
				// components={components}
				// componentsClickOpen={componentsClickOpen}
				// componentsClose={componentsClose}
			/>
		</ReactFlowProvider>
	);
}
