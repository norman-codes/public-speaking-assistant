"use client";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import Expressions from "./Expressions";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentRef, forwardRef } from "react";
import { useAssistantControl } from "@/utils/useAssistantControls";
import Image from 'next/image';
import personIcon from '../public/person_doodle.png';
import robotIcon from '../public/robot_doodle.png';

const Messages = forwardRef<
  ComponentRef<typeof motion.div>,
  Record<never, never>
>(function Messages(_, ref) {
  const { messages } = useVoice();
  useAssistantControl(); // Use the hook to control the assistant

  return (
    <motion.div
      layoutScroll
      className={"grow rounded-md overflow-auto p-4"}
      ref={ref}
    >
      <motion.div
        className={"max-w-2xl mx-auto w-full flex flex-col gap-4 pb-40"}
      >
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
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                  }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center border-r border-gray-200">
                      {msg.type === "user_message" ? (
                        <Image src={personIcon} alt="User icon - a person." className={"ml-4 mr-4"} width={28} height={28} />
                      ) : (
                        <Image src={robotIcon} alt="Assistant icon - a robot." width={56} height={56} />
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
                      {msg.type === "user_message" && (
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
  );
});

export default Messages;
