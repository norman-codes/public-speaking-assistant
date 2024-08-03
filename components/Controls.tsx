"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import WaveformFromFFT from "./WaveformFromFFT";
import { cn } from "@/utils";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft, fft } = useVoice();

  return (
    <div
      className={cn(
        "fixed bottom-10 left-0 w-full p-6 flex items-center justify-center", // Changed p-4 to p-6 for more padding
        "from-card via-card/90 to-card/0",
        "h-24" // Added height for the container
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
              "p-6 bg-card border border-border rounded-lg shadow-sm flex items-center gap-6" // Changed p-4 to p-6 and gap-4 to gap-6 for more spacing
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-5"} /> // Changed size-4 to size-5 for larger icon
              ) : (
                <Mic className={"size-5"} /> // Changed size-4 to size-5 for larger icon
              )}
            </Toggle>

            <div className={"relative grid h-16 w-64 shrink grow-0"}>
              <WaveformFromFFT
                micFft={micFft}
                audioFft={fft}
                micColor={"red"}
                audioColor={"blue"}
                className={"fill-current"}
              />
            </div>

            <Button
              className={"flex items-center gap-2"} // Changed gap-1 to gap-2 for more spacing
              onClick={() => {
                disconnect();
              }}
              variant={"destructive"}
            >
              <span>
                <X
                  className={"size-5 opacity-50"} // Changed size-4 to size-5 for larger icon
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>Stop</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
