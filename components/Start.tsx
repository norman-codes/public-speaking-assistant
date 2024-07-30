import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

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
          <div className="mb-4">
            <svg
              viewBox="0 0 512 512"
              className="w-64 h-64"
              fill="url(#bw-gradient)" // Apply the gradient
              style={{
                filter: "drop-shadow(-10px 10px 6px rgba(0, 0, 0, 0.3))",
              }} // Custom drop shadow
            >
              <defs>
                <linearGradient
                  id="bw-gradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="65%"
                    style={{ stopColor: "black", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "white", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <style type="text/css">
                {`.st0{fill:url(#bw-gradient);}`}
              </style>
              <g>
                <rect
                  x="54.929"
                  y="284.162"
                  className="st0"
                  width="402.142"
                  height="24.109"
                ></rect>
                <polygon
                  className="st0"
                  points="75.036,384.717 97.463,384.717 97.463,355.746 414.537,355.746 414.537,384.717 436.965,384.717 457.071,321.279 54.929,321.279"
                ></polygon>
                <rect
                  x="111.121"
                  y="369.396"
                  className="st0"
                  width="289.759"
                  height="142.604"
                ></rect>
                <circle
                  className="st0"
                  cx="256"
                  cy="69.512"
                  r="69.512"
                ></circle>
                <path
                  className="st0"
                  d="M256,156.942c-85.155,0-106.004,112.531-106.004,112.531h212.008C362.004,269.473,341.155,156.942,256,156.942z"
                ></path>
              </g>
            </svg>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-gray-800">this is a PSA*</h1>
            <p className="text-2xl text-gray-600">*AI public speaking assistant</p>
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
                  <Play
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span>Start</span>
              </Button>
            </motion.div>
          </AnimatePresence>
          <p className="text-xs text-gray-500 mt-6 text-center">
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
