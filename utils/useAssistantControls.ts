import { useEffect } from 'react';
import { useVoice } from '@humeai/voice-react';
import messageEmitter from './eventEmitter';

export const useAssistantControl = () => {
  const { sendPauseAssistantMessage, sendResumeAssistantMessage } = useVoice();

  useEffect(() => {
    const handlePauseAssistant = () => {
      sendPauseAssistantMessage();
    };

    const handleResumeAssistant = () => {
      sendResumeAssistantMessage();
    };

    messageEmitter.on('pause_assistant', handlePauseAssistant);
    messageEmitter.on('resume_assistant', handleResumeAssistant);

    return () => {
      messageEmitter.off('pause_assistant', handlePauseAssistant);
      messageEmitter.off('resume_assistant', handleResumeAssistant);
    };
  }, [sendPauseAssistantMessage, sendResumeAssistantMessage]);
};
