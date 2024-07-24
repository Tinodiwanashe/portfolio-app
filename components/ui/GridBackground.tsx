import React from "react";

{/**
  *  UI: grid
  *  change bg color to bg-black-100 and reduce grid color from
  *  0.2 to 0.03
  */}

export function GridBackground() {
  return (
    <div
    className="max-h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
    {/* Radial gradient for the container to give a faded look */}
      <div
        // change the bg to bg-black-100, so it matches the bg color and will blend in
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
      bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
  </div>
  );
}


