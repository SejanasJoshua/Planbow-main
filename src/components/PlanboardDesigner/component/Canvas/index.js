import React, { useState, useEffect, useCallback, useContext } from 'react';
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

const bg = {
	backgroundSize: '8px 8px',
	backgroundImage:
		'linear-gradient( to right, #e8e8e8 1px, transparent 1px ), linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)',
	height: '100vh',
};

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
	{
		id: '100',
		type: 'newNode',
		data: { label: 'Ideation', sourcePosition: 'right' },
		style: {
			minHeight: 'auto',
			color: '#5447C8',
		},
		position: { x: 700, y: 300 },
	},
];
const initialEdges = [];
const nodeTypes = {
	newNode: CustomNode,
	start: StartNode,
};

let nodeData;
let clickedNode = null;
let clickedEdge = null;

export default function Canvas() {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
		dispatch(updatePlanboardComponent(element));
		// console.log(element);
		setSelectedPlanboardComponent(element);
	}, []);
	const onClickEdge = useCallback((event, element) => {
		clickedEdge = element;
	}, []);

	// const loadComponentonDoubleClick = (selectedNode) => {
	// 	// dispatch(updatePlanboardComponent(selectedNode));
	// 	onSave();
	// 	renderComponent();
	// };

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

	// const renderComponent = () => {
	// 	if (clickedNode.data.label === 'Ideation') history.push('/ideation');
	// 	if (clickedNode.data.label === 'Output') history.push('/ideation');
	// 	if (clickedNode.data.label === 'Offerings') return null;
	// 	if (clickedNode.data.label === 'Funnel') return null;
	// 	if (clickedNode.data.label === 'Start') return null;
	// 	if (clickedNode.data.label === 'Logistics') return null;
	// 	if (clickedNode.data.label === 'Process') return null;
	// 	return null;
	// };

	const addNodes = (data) => {
		console.log(data);
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
				console.log(count);
				const newNode = {
					id: nodeDetails._id,
					type: 'newNode',
					position: {
						x: clickedNode.position.x + 500 * count,
						// x: clickedNode.position.x + 500 * (index + 1),
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
				// console.log(d);
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
		deleteNodes();
	}, [nodes]);
	useEffect(() => {
		deleteEdges();
	}, [edges]);
	useEffect(() => {
		if (planboard.canvas) {
			setNodes(planboard.canvas.nodes || []);
			setEdges(planboard.canvas.edges || []);
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
					...bg,
				}}
			>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					connectionLineStyle={connectionLineStyle}
					onNodeClick={onClickNode}
					onEdgeClick={onClickEdge}
					// onNodeDoubleClick={(n) => loadComponentonDoubleClick(n)}
					minZoom={0.05}
					onInit={setFlowInstance}
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
