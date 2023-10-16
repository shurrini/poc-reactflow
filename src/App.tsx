import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges} from 'reactflow';
import 'reactflow/dist/style.css';

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the' }];

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Hello' },
    type: 'input',
  },
  {
    id: '2',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  //Height and width of the window
  const height = window.innerHeight;
  const width = window.innerWidth;
  
  return (
    //Changed width and height, so the canvas fits the whole screen
    <div style={{ height: height, width: width }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
