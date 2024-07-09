"use client";

import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import Start from "./Start";
import { ComponentRef, useRef } from "react";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  
  return (
    <div
      className={
        "relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]"
      }
    >
      <VoiceProvider
        configId="be5fc593-8ae9-4150-9c3e-f72fd8374fef"
        auth={{ type: "accessToken", value: accessToken }}
        onMessage={(message) => {
          if (timeout.current) {
            window.clearTimeout(timeout.current);
          }

          timeout.current = window.setTimeout(() => {
            if (ref.current) {
              const scrollHeight = ref.current.scrollHeight;

              ref.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth",
              });
            }
          }, 200);

          try {
            // Check the type of the message
            if (message.type === "user_message") {
              const content = message.message.content;
              // Perform your action here, e.g., printing a statement
              console.log("User message content:", content);
            }
          } catch (error) {
            console.error("Failed to parse message:", error)
          }
        }}
      >
        <Messages ref={ref} />
        <Controls />
        <Start />
      </VoiceProvider>
    </div>
  );
}
