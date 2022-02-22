import { useEffect, useState } from "react";
import { sankey as d3sankey } from "d3-sankey";
import type { ReactNode } from "react";
import type { SankeyGraph, SankeyNode, SankeyLink } from "d3-sankey";

interface SankeyProps<N, L> {
  data: {
    nodes: SankeyNode<N, L>[];
    links: SankeyLink<N, L>[];
  };
  width?: number;
  height?: number;
  nodeWidth: number;
  nodePadding: number;
  children?: (sankey: { graph: SankeyGraph<N, L> }) => ReactNode;
}

export default function Sankey<N, L>({
  data,
  width,
  height,
  nodeWidth,
  nodePadding,
  children
}: SankeyProps<N, L>) {
  const sankeyWidth = width ?? 750;
  const sankeyHeight = height ?? 460;

  const [graph, setGraph] = useState<SankeyGraph<N, L>>({
    nodes: [],
    links: []
  });

  useEffect(() => {
    setGraph(
      d3sankey<N, L>()
        .nodeWidth(nodeWidth)
        .nodePadding(nodePadding)
        .extent([
          [0, 0],
          [sankeyWidth, sankeyHeight - 30]
        ])(data)
    );
  }, [nodePadding, nodeWidth, sankeyWidth, sankeyHeight, data]);

  if (children)
    return (
      <svg width={sankeyWidth} height={sankeyHeight}>
        {children({ graph })}
      </svg>
    );

  return <g />;
}
