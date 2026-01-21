import { useMemo } from 'react';

export interface SchemaNode {
  id: string;
  label: string;
  type?: 'source' | 'process' | 'destination' | 'default';
}

export interface SchemaConnection {
  from: string;
  to: string;
  label?: string;
}

export interface SystemSchemaProps {
  nodes: SchemaNode[];
  connections: SchemaConnection[];
  title?: string;
}

const NODE_COLORS = {
  source: 'from-blue-100 to-blue-200 border-blue-300 text-blue-900',
  process: 'from-purple-100 to-purple-200 border-purple-300 text-purple-900',
  destination: 'from-green-100 to-green-200 border-green-300 text-green-900',
  default: 'from-gray-100 to-gray-200 border-gray-300 text-gray-900',
};

export default function SystemSchema({ nodes, connections, title }: SystemSchemaProps) {
  const nodePositions = useMemo(() => {
    // Simple auto-layout: arrange nodes in a grid
    const cols = Math.ceil(Math.sqrt(nodes.length));
    return nodes.map((node, index) => ({
      ...node,
      x: (index % cols) * 280 + 140,
      y: Math.floor(index / cols) * 180 + 90,
    }));
  }, [nodes]);

  const svgWidth = Math.max(...nodePositions.map((n) => n.x)) + 140;
  const svgHeight = Math.max(...nodePositions.map((n) => n.y)) + 90;

  return (
    <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-sm">
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-4 text-center">
          {title}
        </h3>
      )}
      <div className="overflow-x-auto">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="mx-auto"
          style={{ minWidth: '100%' }}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          {/* Render connections first (so they appear behind nodes) */}
          {connections.map((conn, index) => {
            const fromNode = nodePositions.find((n) => n.id === conn.from);
            const toNode = nodePositions.find((n) => n.id === conn.to);

            if (!fromNode || !toNode) return null;

            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;

            return (
              <g key={`${conn.from}-${conn.to}-${index}`}>
                {/* Arrow line */}
                <defs>
                  <marker
                    id={`arrowhead-${index}`}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3, 0 6" fill="#6366f1" />
                  </marker>
                </defs>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="#6366f1"
                  strokeWidth="2"
                  markerEnd={`url(#arrowhead-${index})`}
                  opacity="0.6"
                />
                {/* Connection label */}
                {conn.label && (
                  <text
                    x={midX}
                    y={midY - 10}
                    textAnchor="middle"
                    className="text-xs fill-blue-700 font-medium"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Render nodes */}
          {nodePositions.map((node) => {
            const colorClass = NODE_COLORS[node.type || 'default'];
            return (
              <g key={node.id}>
                <foreignObject x={node.x - 100} y={node.y - 40} width="200" height="80">
                  <div className="flex items-center justify-center h-full">
                    <div
                      className={`px-4 py-3 rounded-lg border-2 bg-gradient-to-br ${colorClass} shadow-md text-center font-semibold text-sm min-w-[180px]`}
                    >
                      {node.label}
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
