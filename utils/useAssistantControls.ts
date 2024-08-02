import { useEffect } from 'react';
import { useVoice } from '@humeai/voice-react';
import messageEmitter from './eventEmitter';

export const useAssistantControl = () => {
  const { sendPauseAssistantMessage, sendResumeAssistantMessage, disconnect, muteAudio, unmuteAudio } = useVoice();

  useEffect(() => {
    const handlePauseAssistant = () => {
      sendPauseAssistantMessage();
    };

    const handleResumeAssistant = () => {
      sendResumeAssistantMessage();
    };

    const handleCloseConnection = () => {
      disconnect();
    };
    
    const handleMuteAssistant = () => {
      muteAudio();
    };

    const handleUnmuteAssistant = () => {
      unmuteAudio();
    }

    messageEmitter.on('pause_assistant', handlePauseAssistant);
    messageEmitter.on('resume_assistant', handleResumeAssistant);
    messageEmitter.on('close_connection', handleCloseConnection);
    messageEmitter.on('mute_assistant', handleMuteAssistant);
    messageEmitter.on('unmute_assistant', handleUnmuteAssistant);

    return () => {
      messageEmitter.off('pause_assistant', handlePauseAssistant);
      messageEmitter.off('resume_assistant', handleResumeAssistant);
      messageEmitter.off('close_connection', handleCloseConnection);
      messageEmitter.off('mute_assistant', handleMuteAssistant);
      messageEmitter.off('unmute_assistant', handleUnmuteAssistant);
    };
  }, [sendPauseAssistantMessage, sendResumeAssistantMessage, disconnect, muteAudio]);
};
