import { useTheme } from "@mui/material/styles";
import type { SankeyNode, sankey, SankeyGraph } from "d3-sankey";
import { ReactNode } from "react";

type NodeProps<N, L> = {
  link: SankeyNode<ExtendedNodeProperties, Record<string, any>>;
  color: string;
  name: string | ReactNode;
  width?: number;
  height?: number;
  graph?: SankeyGraph<N, L>;
  sankey?: typeof sankey;
  volume?: string
  fullAddress?: string
  textColor?: string
};

export enum SankeyItemType {
  Contract = 'Contract',
  Redemption = 'Redemption',
  Certificate = 'Certificate',
  Proof = 'Proof'
}

export type ExtendedNodeProperties = {
  id: string;
  targetIds: string[];
  type: SankeyItemType;
  volume: string;
  period?: string;
  status?: string;
  generator?: string;
  energySources?: string[];
  location?: string;
};

export const isContractNode = (node: SankeyNode<ExtendedNodeProperties, Record<string, any>>) => {
  return node.type === SankeyItemType.Contract
}

export const isEmptyContractNode = (node: SankeyNode<ExtendedNodeProperties, Record<string, any>>) => {
  return node.sourceLinks?.length === 0 && isContractNode(node)
}

export const isNonEmptyContractNode = (node: SankeyNode<ExtendedNodeProperties, Record<string, any>>) => {
  return isContractNode(node) && !isEmptyContractNode(node)
}

export default function Node<N, L>({
  link,
  color,
  name,
  width,
  height,
  volume,
  textColor,
}: NodeProps<N, L>) {
  const theme = useTheme()
  const { x0, x1, y0, y1 } = link

  const isLinkAnEmptyContractNode = isEmptyContractNode(link)
  const isFirstNode = !y0
  const defaultWidth = (x1 ?? 0) - (x0 ?? 0);
  const defaultHeight = (y1 ?? 0) - (y0 ?? 0);

  const nodeWidth = (width ? width : defaultWidth);
  const nodeHeight = height ? height : defaultHeight
  const nodeX = isLinkAnEmptyContractNode ? 0 : x0;
  const nodeY = height && !isFirstNode
    // smaller nodeY for empty contract nodes
    ? y0 + defaultHeight / 2 - height / (isLinkAnEmptyContractNode ? 15 : 2)
    : y0 ?? 0;

  const textX = (isLinkAnEmptyContractNode ? 0 : x0 ?? 0) + 15;
  const textY = height ? nodeY + height / 5 + 6 : (y0 ?? 0) + nodeHeight / 2 + 6;

  return (
      <g style={{ pointerEvents: "all" }}>
        <rect
          x={nodeX}
          y={nodeY}
          width={10}
          height={nodeHeight}
          fill={color}
        />
        <text
          x={textX}
          y={textY}
          width={nodeWidth}
          fill={textColor ?? 'black'}
          style={{
            userSelect: "none",
            overflowX: "hidden",
            fontWeight: 600,
            color: theme.palette.primary.main
          }}
        >
          {name}
        </text>
        <text
          x={textX}
          y={textY+20}
          width={nodeWidth}
          fill={textColor ?? 'black'}
          style={{
            userSelect: "none",
            overflowX: "hidden",
            fontWeight: 600,
            color: theme.palette.primary.main
          }}
        >
          {volume}
        </text>
      </g>
  );
}
