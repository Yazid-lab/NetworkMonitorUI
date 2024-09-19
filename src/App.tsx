import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './index.css'
import { useNavigate } from 'react-router-dom';

const nodes1: Node[] = [
  { id: '1', type: 'default', data: { label: 'Decoder 1: 192.168.10.21' }, position: { x: 150, y: 50 } },
  { id: '2', type: 'default', data: { label: 'Decoder 2: 192.168.10.22' }, position: { x: 300, y: 150 } },
  { id: '3', type: 'default', data: { label: 'Decoder 3: 192.168.10.23' }, position: { x: 150, y: 250 } },
  { id: '4', type: 'default', data: { label: 'Decoder 4: 192.168.10.24' }, position: { x: 0, y: 150 } },
];
 
export default function App() {
  const [nodes,, onNodesChange] = useNodesState(nodes1);
  const navigate = useNavigate();
 const onNodeClick = (_:React.MouseEvent, node:Node) =>{
  navigate(`/device/${node.id}`)
 }
  return (
      <div className='reactFlowContainer'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodesDraggable={false}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
      </div>
  );
}