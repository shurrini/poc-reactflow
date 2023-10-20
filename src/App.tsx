import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import ButtonEdge from './ButtonEdge';

//Defining InitialNodes properties
const initialNodes: Node[] = [
  {
    id: 'button-1',
    type: 'input',
    data: { label: 'Lugar 1' },
    position: { x: 0, y: 0 },
    sourcePosition: 'right', //Position of the connection point for outgoing edges
  },
  { 
    id: 'button-2', 
    data: { label: 'Lugar 2' }, 
    position: { x: 300, y: 0 },
    targetPosition: 'left', //Position of the connection point for incoming edges
  },
];

const initialEdges: Edge[] = [
  {
    id: 'edge-button',
    source: 'button-1',
    target: 'button-2',
    type: 'buttonedge',
    data: { 
      sourceLabel: 'Lugar 1',
      targetLabel: 'Lugar 2',
    },
  },
];

//Height and width of the window
const height = window.innerHeight;
const width = window.innerWidth;

//Custom Button Edge type
const edgeTypes = {
  buttonedge: ButtonEdge,
};

//Main component definition
const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ height: height, width: width }}> {/*So the canvas fits the whole window*/}  
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid={true}
        edgeTypes={edgeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default EdgesFlow;
