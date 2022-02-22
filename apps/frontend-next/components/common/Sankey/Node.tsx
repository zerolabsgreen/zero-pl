import Tooltip from "@mui/material/Tooltip";
import type { SankeyNode, sankey, SankeyGraph } from "d3-sankey";

type NodeProps<N, L> = {
  link: SankeyNode<Record<string, unknown>, Record<string, unknown>>;
  color: string;
  name: string;
  width?: number;
  height?: number;
  graph?: SankeyGraph<N, L>;
  sankey?: typeof sankey;
  address?: string
};

export default function Node<N, L>({
  link: { x0, x1, y0, y1 },
  color,
  name,
  width,
  height,
  address
}: NodeProps<N, L>) {
  const defaultWidth = x1 - x0;
  const defaultHeight = y1 - y0;

  const nodeWidth = width ? width : defaultWidth;
  const nodeHeight = height ? height : defaultHeight;

  const nodeX = x0;
  const nodeY = height ? y0 + defaultHeight / 2 - height / 2 : y0;

  const textX = x0;
  const textY = height ? nodeY + height / 2 + 6 : y0 + nodeHeight / 2 + 6;

  return (
    <Tooltip title={address}>
      <g style={{ pointerEvents: "all" }} onClick={() => console.log()}>
        <rect
          x={nodeX}
          y={nodeY}
          width={nodeWidth}
          height={nodeHeight}
          fill={color}
        >
          <title>{name}</title>
        </rect>
        <text
          x={textX + 5}
          y={textY}
          width={nodeWidth}
          fill="black"
          style={{ userSelect: "none", overflowX: "hidden" }}
        >
          {name}
        </text>
      </g>
    </Tooltip>
  );
}
