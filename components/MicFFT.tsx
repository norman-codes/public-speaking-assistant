"use client";

import React from "react";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";

export default function MicFFT({
  micFft,
  audioFft,
  micColor,
  audioColor,
  className,
}: {
  micFft: number[];
  audioFft: number[];
  micColor: string;
  audioColor: string;
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
            {Array.from({ length: micFft.length }).map((_, index) => {
              const micValue = (micFft[index] ?? 0) / 4;
              const micHeight = Math.min(Math.max(height * micValue, 2), height);
              const micYOffset = height * 0.5 - micHeight * 0.5;

              return (
                <motion.rect
                  key={`mic-fft-${index}`}
                  height={micHeight}
                  width={2}
                  x={2 + (index * width - 4) / micFft.length}
                  y={micYOffset}
                  rx={4}
                  fill={micColor}
                  opacity={0.7}
                />
              );
            })}
            {Array.from({ length: audioFft.length }).map((_, index) => {
              const audioValue = (audioFft[index] ?? 0) / 4;
              const audioHeight = Math.min(Math.max(height * audioValue, 2), height);
              const audioYOffset = height * 0.5 - audioHeight * 0.5;

              return (
                <motion.rect
                  key={`audio-fft-${index}`}
                  height={audioHeight}
                  width={2}
                  x={2 + (index * width - 4) / audioFft.length}
                  y={audioYOffset}
                  rx={4}
                  fill={audioColor}
                  opacity={0.7}
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
