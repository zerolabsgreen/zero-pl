import Tooltip from "@mui/material/Tooltip";
import type { SankeyNode, sankey, SankeyGraph } from "d3-sankey";
import { ExtendedNodeProperties, SankeyItemType } from "../BeneficiaryPage/SankeyView";

type NodeProps<N, L> = {
  link: SankeyNode<ExtendedNodeProperties, Record<string, any>>;
  color: string;
  name: string;
  width?: number;
  height?: number;
  graph?: SankeyGraph<N, L>;
  sankey?: typeof sankey;
  volume?: string
  fullAddress?: string
  textColor?: string
};

export const isEmptyContractNode = (node: SankeyNode<ExtendedNodeProperties, Record<string, any>>) => {
  return node.sourceLinks?.length === 0 && node.type === SankeyItemType.Contract
}

export default function Node<N, L>({
  link,
  color,
  name,
  width,
  height,
  fullAddress,
  textColor,
}: NodeProps<N, L>) {
  const { x0, x1, y0, y1 } = link

  const isLinkAnEmptyContractNode = isEmptyContractNode(link)
  const isFirstNode = !y0
  const defaultWidth = (x1 ?? 0) - (x0 ?? 0);
  const defaultHeight = (y1 ?? 0) - (y0 ?? 0);

  const nodeWidth = width ? width : defaultWidth;
  const nodeHeight = height ? height : defaultHeight;
  const nodeX = isLinkAnEmptyContractNode ? 0 : x0;
  const nodeY = height && !isFirstNode
    // smaller nodeY for empty contract nodes
    ? y0 + defaultHeight / 2 - height / (isLinkAnEmptyContractNode ? 15 : 2)
    : y0 ?? 0;

  const textX = (isLinkAnEmptyContractNode ? 0 : x0) ?? 0;
  const textY = height ? nodeY + height / 2 + 6 : (y0 ?? 0) + nodeHeight / 2 + 6;

  return (
    <Tooltip title={fullAddress ?? ''}>
      <g style={{ pointerEvents: "all" }}>
        <rect
          x={nodeX}
          y={nodeY}
          width={nodeWidth}
          height={nodeHeight}
          fill={color}
          rx="5"
        />
        <text
          x={textX + 10}
          y={textY}
          width={nodeWidth}
          fill={textColor ?? 'black'}
          style={{ userSelect: "none", overflowX: "hidden", }}
        >
          {name}
        </text>
      </g>
    </Tooltip>
  );
}
