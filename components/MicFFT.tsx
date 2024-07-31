"use client";

import React from "react";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";

export default function MicFFT({
  fft,
  color,
  className,
}: {
  fft: number[];
  color: string;
  className?: string;
}) {
  return (
    <div className={"relative size-full"}>
      <AutoSizer>
        {({ width, height }) => (
          <motion.svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className={cn("absolute !inset-0 !size-full", className)}
          >
            {Array.from({ length: fft.length }).map((_, index) => {
              const value = (fft[index] ?? 0) / 4;
              const h = Math.min(Math.max(height * value, 2), height);
              const yOffset = height * 0.5 - h * 0.5;

              return (
                <motion.rect
                  key={`mic-fft-${index}`}
                  height={h}
                  width={2}
                  x={2 + (index * width - 4) / fft.length}
                  y={yOffset}
                  rx={4}
                  fill={color}
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
