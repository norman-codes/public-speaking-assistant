"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";
import { useAssistantControl } from "@/utils/useAssistantControls";
import UserIcon from '../components/logos/UserIcon';
import AssistantIcon from '../components/logos/AssistantIcon';

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  { isVisible: boolean } // Add prop type for visibility
>(function Messages({ isVisible }, ref) {
  const { messages } = useVoice();
  useAssistantControl(); // Use the hook to control the assistant

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layoutScroll
          className={"grow rounded-md overflow-auto p-4"}
          ref={ref}
          initial={{ opacity: 0 }} // Start from fully transparent
          animate={{ opacity: 1 }} // Fade to fully opaque
          exit={{ opacity: 0 }} // Fade out to fully transparent
          transition={{ opacity: { duration: 0.5 } }} // Smooth transition for opacity
        >
          <motion.div className={"max-w-2xl mx-auto w-full flex flex-col gap-4 pb-40"}>
            <AnimatePresence mode={"popLayout"}>
              {messages.map((msg, index) => {
                if (
                  msg.type === "user_message" ||
                  msg.type === "assistant_message"
                ) {
                  return (
                    <motion.div
                      key={msg.type + index}
                      className={cn(
                        "w-[80%]",
                        "bg-card",
                        "border border-border rounded",
                        "shadow-lg",
                        msg.type === "user_message" ? "ml-auto" : ""
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 0 }}
                      transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 } }} // Smooth transition for opacity and y-axis movement
                    >
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center border-r border-gray-200">
                          {msg.type === "user_message" ? (
                            <UserIcon width='64' height='64' />
                          ) : (
                            <AssistantIcon width='56' height='56' />
                          )}
                        </div>
                        <div className="flex-grow p-3">
                          <div
                            className={cn(
                              "text-s mb-1 font-serif font-medium leading-none opacity-50"
                            )}
                          >
                            {msg.message.role}
                          </div>
                          <div className={"pb-2 font-mono"}>{msg.message.content}</div>
                          {msg.type === "user_message" && msg.from_text === false && (
                            <Expressions values={msg.models.prosody?.scores ?? {}} />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                return null;
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Messages;

