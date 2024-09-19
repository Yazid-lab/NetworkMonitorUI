import React from 'react';
import ReactFlow, { Node, MiniMap, Controls, Background, useNodesState } from '@xyflow/react';
import { useNavigate } from 'react-router-dom';

const initialNodes: Node[] = [
  { id: '1', type: 'default', data: { label: 'Router 1' }, position: { x: 150, y: 50 } },
  { id: '2', type: 'default', data: { label: 'Router 2' }, position: { x: 300, y: 150 } },
  { id: '3', type: 'default', data: { label: 'Router 3' }, position: { x: 150, y: 250 } },
  { id: '4', type: 'default', data: { label: 'Router 4' }, position: { x: 0, y: 150 } },
];

const RouterFlow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const navigate = useNavigate();

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    navigate(`/router/${node.id}`);
  };

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        nodesDraggable={false}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default RouterFlow;
