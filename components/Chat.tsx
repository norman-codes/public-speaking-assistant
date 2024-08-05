"use client";

import {
  VoiceProvider, 
  ToolCall, 
  ToolCallHandler,
  ToolResponse, 
  ToolError,
} from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import Start from "./Start";
import messageEmitter from "@/utils/eventEmitter"; 
import { ComponentRef, useRef, useState, useEffect } from "react";

const handleToolCall: ToolCallHandler = async (
  toolCall: ToolCall
): Promise<ToolResponse | ToolError> => {
  console.log("Tool call received", toolCall);

  if (toolCall.name === 'pauseAssistant') {
    try {

      // Emit event for pausing the assistant
      messageEmitter.emit("pause_assistant");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "",
      };
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Pause assistant tool error',
        code: 'pause_tool_error',
        level: 'warn',
        content: 'There was an error with the pause assistant message tool',
      };
    }
  }
  else if (toolCall.name === 'muteAssistant') {
    try {

      // Emit event for muting the assistant
      messageEmitter.emit("mute_assistant");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Assistant muted. Assistant will generate messages but the user will not hear them.",
      };
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Mute assistant tool error',
        code: 'mute_tool_error',
        level: 'warn',
        content: 'There was an error with the mute assistant tool',
      };
    }
  }
  else if (toolCall.name === 'unmuteAssistant') {
    try {

      // Emit event for unmuting the assistant
      messageEmitter.emit("unmute_assistant");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Assistant unmuted. The user can now both see and hear the assistant's messages.",
      };
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Unmute assistant tool error',
        code: 'unmute_tool_error',
        level: 'warn',
        content: 'There was an error with the unmute assistant tool',
      };
    }
  }
  else if (toolCall.name === 'actOnProvidedConsent') {
    try {
      console.log("Consent granted!")

      // Emit event for provided consent
      messageEmitter.emit("consent_provided");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Thank you. Let's get started.",
      }
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Act on provided consent tool error',
        code: 'consent_granted_tool_error',
        level: 'warn',
        content: 'There was an error with the consent provision tool'
      }
    }
  }
  else if (toolCall.name === 'actOnRevokedConsent') {
    try {
      console.log("Consent revoked!")
      
      // Emit event for revoked consent
      messageEmitter.emit("consent_revoked");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "I understand and thank you for your time. The conversation will end now.",
      }
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Act on revoked consent tool error',
        code: 'consent_granted_tool_error',
        level: 'warn',
        content: 'There was an error with the consent revocation tool'
      }
    }
  }
  else if (toolCall.name === 'enterFocusMode') {
    try {
      console.log("ENTER focus mode indicator!")
      
      // Emit event for entering focus mode
      messageEmitter.emit("enter_focus_mode");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Entering focus mode. The messages are now hidden.",
      }
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Enter focus mode tool error',
        code: 'enter_focus_mode_tool_error',
        level: 'warn',
        content: 'There was an error with the enter focus mode tool'
      }
    }
  }
  else if (toolCall.name === 'exitFocusMode') {
    try {
      console.log("EXIT focus mode indicator!")
      
      // Emit event for exiting focus mode
      messageEmitter.emit("exit_focus_mode");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Exiting focus mode. The messages are now visible.",
      }
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Exit focus mode tool error',
        code: 'exit_focus_mode_tool_error',
        level: 'warn',
        content: 'There was an error with the exit focus mode tool'
      }
    }
  }
  else if (toolCall.name === 'stopChat') {
    try {

      // Emit the chat closing event
      messageEmitter.emit("close_connection");

      return {
        type: 'tool_response',
        tool_call_id: toolCall.tool_call_id,
        content: "Thank you for your time. The chat will now end.",
      }
    } catch (error) {
      return {
        type: 'tool_error',
        tool_call_id: toolCall.tool_call_id,
        error: 'Stop chat tool error',
        code: 'stop_chat_tool_error',
        level: 'warn',
        content: 'There was an error with the stop chat tool'
      }
    }
  }
  else {
    return {
      type: 'tool_error',
      tool_call_id: toolCall.tool_call_id,
      error: 'Tool not found',
      code: 'tool_not_found',
      level: 'warn',
      content: 'The tool you requested was not found',
    };
  }
};

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [chatGroupId, setChatGroupId] = useState<string | undefined>(undefined);
  const [consentProvided, setConsentProvided] = useState<boolean | null>(null); // Track consent state
  const [focusMode, setFocusMode] = useState<boolean>(false); // Track focus mode state
  const [isPaused, setIsPaused] = useState<boolean>(false); // Track paused state

  // Log chatGroupId whenever it changes
  useEffect(() => {
    console.log("Current Chat Group ID: ", chatGroupId);
    console.log("Chat Group ID updated to:", chatGroupId);
  }, [chatGroupId]);

  // Listen for consent and focus mode events
  useEffect(() => {
    const handleConsentProvided = () => {
      setConsentProvided(true);
    };

    const handleConsentRevoked = () => {
      setConsentProvided(false);
    };

    const handleEnterFocusMode = () => {
      setFocusMode(true);
    };

    const handleExitFocusMode = () => {
      setFocusMode(false);
    };

    const handlePauseAssistant = () => {
      setIsPaused(true);
    };

    const handleResumeAssistant = () => {
      setIsPaused(false);
    };

    messageEmitter.on('consent_provided', handleConsentProvided);
    messageEmitter.on('consent_revoked', handleConsentRevoked);
    messageEmitter.on('enter_focus_mode', handleEnterFocusMode);
    messageEmitter.on('exit_focus_mode', handleExitFocusMode);
    messageEmitter.on('pause_assistant', handlePauseAssistant);
    messageEmitter.on('resume_assistant', handleResumeAssistant);

    return () => {
      messageEmitter.off('consent_provided', handleConsentProvided);
      messageEmitter.off('consent_revoked', handleConsentRevoked);
      messageEmitter.off('enter_focus_mode', handleEnterFocusMode);
      messageEmitter.off('exit_focus_mode', handleExitFocusMode);
      messageEmitter.off('pause_assistant', handlePauseAssistant);
      messageEmitter.off('resume_assistant', handleResumeAssistant);
    };
  }, []);

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

          if (message.type === "chat_metadata") {

            console.log("id obtained: " + message.chat_group_id);

            if (chatGroupId === undefined) {
              setChatGroupId(message.chat_group_id);
            }
          }

          try {
            // Emit event for specific message type and content
            console.log(message.type);
            if (message.type === "user_message" && message.message.content === "Start performance.") {
              console.log("START PERFORMANCE SAID CLIENT SIDE");
            }
            if (message.type === "user_message" && message.message.content === "Stop performance.") {
              console.log("STOP PERFORMANCE SAID CLIENT SIDE");
              messageEmitter.emit("resume_assistant");
            }
          } catch (error) {
            console.error("Failed to parse message:", error);
          }
        }}
        onToolCall={handleToolCall}
        resumedChatGroupId={chatGroupId}
      >
        <Messages ref={ref} isVisible={!focusMode} /> {/* Conditionally render Messages */}
        <Controls consentProvided={consentProvided} focusMode={focusMode} isPaused={isPaused} /> {/* Pass consent, focus, and pause states to Controls */}
        <Start />
      </VoiceProvider>
    </div>
  );
}

