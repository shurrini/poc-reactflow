import ReactFlow, {
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Edge,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ButtonEdge from './ButtonEdge';
import { Button } from "@/components/ui/button";

//Defining InitialNodes properties
const initialNodes: Node[] = [
  {
    id: 'button-1',
    data: { label: 'Lugar 1' },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right, //Position of the connection point for outgoing edges
    targetPosition: Position.Left, //Position of the connection point for incoming edges
  },
  { 
    id: 'button-2', 
    data: { label: 'Lugar 2' }, 
    position: { x: 300, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left, 
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addNode = () => {
    // Get the position of the last node
    const lastNodePosition = nodes[nodes.length - 1].position;

    // Create a new node
    const newNode = {
      id: `button-${nodes.length + 1}`,
      data: { label: `Lugar ${nodes.length + 1}` },
      position: { x: lastNodePosition.x + 300, y: lastNodePosition.y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    // Create a new edge from the last node to the new node
    const newEdge = {
      id: `edge-${edges.length + 1}`,
      source: nodes[nodes.length - 1].id,
      target: newNode.id,
      type: 'buttonedge',
      data: { 
        sourceLabel: nodes[nodes.length - 1].data.label,
        targetLabel: newNode.data.label,
      },
    };

    // Update the nodes and edges state
    setNodes((ns) => [...ns, newNode]);
    setEdges((es) => [...es, newEdge]);
  };

  return (
    <div style={{ height: height, width: width}}> {/*So the canvas fits the whole window*/}  
      <div style={{ position: 'absolute', bottom: 15, right: 15, zIndex: 1000}}>
        <Button onClick={addNode}>Agregar Lugar</Button>
      </div>
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
