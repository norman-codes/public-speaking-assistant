"use client";

import React from "react";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { AutoSizer } from "react-virtualized";

export default function WaveformFromFFT({
  micFft,
  audioFft,
  micColor,
  audioColor,
  micThreshold = 0.7,
  className,
}: {
  micFft: number[];
  audioFft: number[];
  micColor: string;
  audioColor: string;
  micThreshold?: number;
  className?: string;
}) {
  // Check if any mic values exceed the threshold
  const micExceedsThreshold = micFft.some(value => (value / 2) > micThreshold);

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
              const micValue = (micFft[index] ?? 0) / 2; // Adjust scaling factor as needed
              const micHeight = Math.min(Math.max(height * micValue, 2), height);
              const micYOffset = height * 0.5 - micHeight * 0.5;
              const micOpacity = micExceedsThreshold ? 0.7 : 0.2; // Full opacity if any value exceeds threshold

              return (
                <motion.rect
                  key={`mic-fft-${index}`}
                  height={micHeight}
                  width={4} // Increased width for larger rectangles
                  x={4 + (index * (width - 8)) / micFft.length}
                  y={micYOffset}
                  rx={4}
                  fill={micColor}
                  opacity={micOpacity}
                />
              );
            })}
            {Array.from({ length: audioFft.length }).map((_, index) => {
              const audioValue = (audioFft[index] ?? 0) / 2; // Adjust scaling factor as needed
              const audioHeight = Math.min(Math.max(height * audioValue, 2), height);
              const audioYOffset = height * 0.5 - audioHeight * 0.5;

              return (
                <motion.rect
                  key={`audio-fft-${index}`}
                  height={audioHeight}
                  width={4} // Increased width for larger rectangles
                  x={4 + (index * (width - 8)) / audioFft.length}
                  y={audioYOffset}
                  rx={4}
                  fill={audioColor}
                  opacity={0.7} // Fixed opacity for audio FFT
                />
              );
            })}
          </motion.svg>
        )}
      </AutoSizer>
    </div>
  );
}
