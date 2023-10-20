import { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Node,
  Edge,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ButtonEdge from './ButtonEdge';

const initialNodes: Node[] = [
  {
    id: 'button-1',
    type: 'input',
    data: { label: 'Lugar' },
    position: { x: 125, y: 0 },
  },
  { id: 'button-2', data: { label: 'Lugar' }, position: { x: 125, y: 200 } },
];

const initialEdges: Edge[] = [
  {
    id: 'edge-button',
    source: 'button-1',
    target: 'button-2',
    type: 'buttonedge',
  },
];

//Height and width of the window
const height = window.innerHeight;
const width = window.innerWidth;

const edgeTypes = {
  buttonedge: ButtonEdge,
};

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ height: height, width: width }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="top-right"
        connectionMode={ConnectionMode.Loose}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default EdgesFlow;
