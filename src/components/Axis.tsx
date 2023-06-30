import React from "react";

const Axis = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    fill="none"
    stroke="black"
  >
    {/* X axis */}
    <line
      x1="10"
      y1="100"
      x2="190"
      y2="100"
      strokeWidth="1"
      markerStart="url(#arrow)"
      markerEnd="url(#arrow)"
    />
    {/* Y axis */}
    <line
      x1="100"
      y1="190"
      x2="100"
      y2="10"
      strokeWidth="1"
      markerStart="url(#arrow)"
      markerEnd="url(#arrow)"
    />
    {/* Arrowhead marker definition */}
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 20 20"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 L 2 5 z" fill="black" />
      </marker>
    </defs>
  </svg>
);

export default Axis;
