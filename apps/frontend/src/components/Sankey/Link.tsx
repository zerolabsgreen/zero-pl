import { useState } from "react";
import { linkHorizontal } from "d3-shape";
import type { SankeyLink } from "d3-sankey";
import Tooltip from "@mui/material/Tooltip";
import { ExtendedNodeProperties } from "../BeneficiaryPage/SankeyView";

type LinkProps = {
  link: SankeyLink<ExtendedNodeProperties, Record<string, any>>;
  color: string;
  maxWidth?: number;
};

function horizontalSourceO(d: any): [number, number] {
  const y = (d.source.y1 - d.source.y0) / 2 + d.source.y0;
  return [d.source.x1, y];
}

function horizontalTargetO(d: any): [number, number] {
  const y = (d.target.y1 - d.target.y0) / 2 + d.target.y0;
  return [d.target.x0, y];
}

function horizontalSource(d: any): [number, number] {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d: any): [number, number] {
  return [d.target.x0, d.y1];
}

function sankeyLinkHorizontal() {
  return linkHorizontal().source(horizontalSource).target(horizontalTarget);
}

function sankeyLinkHorizontalO() {
  return linkHorizontal().source(horizontalSourceO).target(horizontalTargetO);
}

export default function Link({ link, color, maxWidth }: LinkProps) {
  const linkWidth = maxWidth
    ? (link.value / (link.source as any).value) * maxWidth
    : link.width;

  const path: any = maxWidth
    ? sankeyLinkHorizontalO()(link as any)
    : sankeyLinkHorizontal()(link as any);

  const [opacity, setOpacity] = useState(0.3);

  return (
    <Tooltip title={`${link.value} MWh`}>
      <path
        d={path}
        style={{
          fill: "none",
          strokeOpacity: opacity,
          stroke: color,
          strokeWidth: linkWidth && !isNaN(linkWidth) ? linkWidth : 0
        }}
        onMouseEnter={() => setOpacity(0.8)}
        onMouseLeave={() => setOpacity(0.3)}
      />
    </Tooltip>
  );
}
