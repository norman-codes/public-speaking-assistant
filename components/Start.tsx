import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import Image from 'next/image';
import mic_drawing from '../public/mic_drawing.png'; // Ensure the path is correct
import play_button_doodle from '../public/play_button_doodle.png'

export default function Start() {
  const { status, connect } = useVoice();

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={
            "fixed inset-0 p-4 flex flex-col items-center justify-center bg-transparent"
          }
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-7xl font-serif font-bold text-gray-800">this is a PSA*</h1>
            <p className="text-3xl font-serif text-gray-600">*AI public speaking assistant</p>
          </div>
          <div className="mb-2">
            <Image
              src={mic_drawing}
              alt="Sketch of a microphone on a table."
              width={312} // Adjust width as necessary
              height={312} // Adjust height as necessary
              style={{
                marginBottom: 24,
                filter: "drop-shadow(-10px 10px 6px rgba(0, 0, 0, 0.3))",
              }}
            />
          </div>
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5 scale-125"}
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <span>
                  <Image
                    src={play_button_doodle}
                    alt="Microphone Icon"
                    width={20} // Adjust width as necessary
                    height={20} // Adjust height as necessary
                  />
                </span>
                <span className={"font-mono"}>Start</span>
              </Button>
            </motion.div>
          </AnimatePresence>
          <p className="text-s font-mono text-gray-500 mt-6 text-center">
            By starting a conversation, I accept Hume's{" "}
            <a
              target="_blank"
              href="https://platform.hume.ai/policies/terms-of-use"
              className="underline"
            >
              Terms of Use
            </a>
            <br />
            and acknowledge the{" "}
            <a
              target="_blank"
              href="https://www.hume.ai/privacy-policy/"
              className="underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
