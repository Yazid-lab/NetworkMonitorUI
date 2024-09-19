import React from 'react';
import { Handle, NodeProps } from '@xyflow/react';

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {data.label}
    </div>
  );
};

export default CustomNode;
