"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import WaveformFromFFT from "./WaveformFromFFT";
import { cn } from "@/utils";
import StopIcon from "./logos/StopIcon";
import MutedMicrophoneIcon from "./logos/MutedMicrophoneIcon";
import ActiveMicrophoneIcon from "./logos/ActiveMicrophoneIcon";
import { useState } from "react";
import Modal from "./ui/modal"; // Import the Modal component
import WritingIcon from "./logos/WritingIcon";

export default function Controls() {
  const { disconnect, status, isMuted, unmute, mute, micFft, fft, sendUserInput } = useVoice();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSend = (message: string) => {
    sendUserInput(message)
  };

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
                <MutedMicrophoneIcon className={"size-6"} />
              ) : (
                <ActiveMicrophoneIcon className={"size-6"} />
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
                setModalOpen(true);
              }}
              variant={"ghost"}
            >
              <span>
                <WritingIcon className={"w-10 h-10"}/>
              </span>
            </Button>

            <Button
              className={"flex items-center gap-2"} // Changed gap-1 to gap-2 for more spacing
              onClick={() => {
                disconnect();
              }}
              variant={"ghost"}
            >
              <span>
                <StopIcon fill="red" className={"size-6"} />
              </span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSend}
        title="Send a Message"
        showInput={true} // Show the input field in this modal
      />
    </div>
  );
}
