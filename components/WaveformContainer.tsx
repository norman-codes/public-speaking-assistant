"use client";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import WaveformFromFFT from "./WaveformFromFFT";
import { cn } from "@/utils";

export default function WaveformContainer() {
  const { status, micFft, fft } = useVoice();

  return (
    <div
      className={cn(
        "fixed left-0 w-full p-4 flex items-center justify-center",
        "bg-gradient-to-t from-card via-card/90 to-card/0"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <WaveformFromFFT
                micFft={micFft}
                audioFft={fft}
                micColor={"red"}
                audioColor={"blue"}
                className={"fill-current"}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
