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
import { useState, useEffect } from "react";
import Modal from "./ui/modal";
import WritingIcon from "./logos/WritingIcon";

// Define the type for the consentProvided prop
interface ControlsProps {
  consentProvided: boolean | null;
}

export default function Controls({ consentProvided }: ControlsProps) {
  const { disconnect, status, isMuted, unmute, mute, micFft, fft, sendUserInput } = useVoice();
  const [isModalOpen, setModalOpen] = useState(false);
  const [shadow, setShadow] = useState('');

  // Set a faint glow around the controls based on the state of consent
  useEffect(() => {
    if (consentProvided === null) {
      setShadow('0 0 0 0 rgba(0, 0, 0, 0)');
    } else if (consentProvided) {
      setShadow('0 0 10px 2px rgba(0, 255, 0, 0.5)');
    } else {
      setShadow('0 0 10px 2px rgba(255, 0, 0, 0.5)');
    }
  }, [consentProvided]);

  // user text input handler
  const handleSend = (message: string) => {
    sendUserInput(message);
  };

  return (
    <div
      className={cn(
        "fixed bottom-10 left-0 w-full p-6 flex items-center justify-center", // Changed p-4 to p-6 for more padding
        "from-card via-card/90 to-card/0",
        "h-24"
      )}
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
              boxShadow: ''
            }}
            animate={{
              y: 0,
              opacity: 1,
              boxShadow: shadow
            }}
            exit={{
              y: "100%",
              opacity: 0,
              boxShadow: ''
            }}
            transition={{
              boxShadow: { duration: 0.5 },
              y: { type: "spring", stiffness: 300, damping: 30 }
            }}
            className={
              "p-5 bg-card border border-border rounded-lg shadow-sm flex items-center gap-6"
            }
          >
            <div className="flex h-full w-full">
              <div className="flex items-center justify-center w-2/3 border-r pr-6 border-gray-300">
                <div className={"relative grid h-16 w-72 shrink grow-0"}>
                  <WaveformFromFFT
                    micFft={micFft}
                    audioFft={fft}
                    micColor={"red"}
                    audioColor={"blue"}
                    className={"fill-current"}
                  />
                </div>
              </div>
              <div className="flex items-center justify-evenly w-1/3 pl-6 mr-2">
                <Toggle
                  pressed={!isMuted}
                  onPressedChange={() => {
                    if (isMuted) {
                      unmute();
                    } else {
                      mute();
                    }}
                  }
                >
                  {isMuted ? (
                    <MutedMicrophoneIcon className={"size-6"} />
                  ) : (
                    <ActiveMicrophoneIcon className={"size-6"} />
                  )}
                </Toggle>

                <Button
                  className={"flex items-center gap-2"}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  variant={"ghost"}
                >
                  <span>
                    <WritingIcon className={"w-10 h-10"} />
                  </span>
                </Button>

                <Button
                  className={"flex items-center gap-2"}
                  onClick={() => {
                    disconnect();
                  }}
                  variant={"ghost"}
                >
                  <span>
                    <StopIcon fill="red" className={"size-6"} />
                  </span>
                </Button>
              </div>
            </div>
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
