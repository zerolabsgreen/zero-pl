import { useRef, useState } from "react";
import { linkHorizontal } from "d3-shape";
import type { SankeyLink } from "d3-sankey";
import SankeyLinkPopover from "./LinkPopover";
import { ExtendedNodeProperties, SankeyItemType } from "./Node";

type LinkProps = {
  link: SankeyLink<ExtendedNodeProperties, Record<string, any>>;
  color: string;
  maxWidth?: number;
  width?: number;
  beneficiary?: string;
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
  return [d.source.x0, d.y0];
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

export default function Link({ link, color, maxWidth, width, beneficiary }: LinkProps) {
  const linkWidth = width
    ? width
    : maxWidth
      ? (link.value / (link.source as any).value) * maxWidth
      : link.width;

  const path: any = maxWidth
    ? sankeyLinkHorizontalO()(link as any)
    : sankeyLinkHorizontal()(link as any);

  const [opacity, setOpacity] = useState(0.3);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverAnchor = useRef(null)
  const handlePopoverOpen = () => {
    setPopoverOpen(true)
    setOpacity(0.8)
  };
  const handlePopoverClose = () => {
    setPopoverOpen(false)
    setOpacity(0.3)
  };
  const source = link.source as any;
  const target = link.target as any;

  return (
    <>
      <path
        d={path}
        ref={popoverAnchor}
        aria-owns={'sankey-link-popover'}
        aria-haspopup="true"
        onMouseOver={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{
          fill: "none",
          strokeOpacity: opacity,
          stroke: color,
          strokeWidth: linkWidth && !isNaN(linkWidth) ? linkWidth : 0,
        }}
      />
      <SankeyLinkPopover
         open={popoverOpen}
         anchorEl={popoverAnchor.current}
         handleClose={handlePopoverClose}
         handleOpen={handlePopoverOpen}
         type={source.type}
         id={source.id}
         targetId={source.type === SankeyItemType.Certificate ? target.id : source.id}
         amount={target.volume}
         beneficiary={beneficiary}
         period={source.period}
         generator={source.generator}
         sources={source.energySources}
         location={source.location}
      />
    </>
  );
}
