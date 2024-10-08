import { useEffect } from 'react';
import { useVoice } from '@humeai/voice-react';
import messageEmitter from './eventEmitter';

export const useAssistantControl = () => {
  const { sendPauseAssistantMessage, sendResumeAssistantMessage, disconnect, muteAudio, unmuteAudio, sendAssistantInput } = useVoice();

  useEffect(() => {
    const handlePauseAssistant = () => {
      sendPauseAssistantMessage();
    };

    const handleResumeAssistant = () => {
      sendResumeAssistantMessage();
    };

    const handleCloseConnection = () => {
      setTimeout(() => {
        disconnect();
      }, 1000)
    };
    
    const handleMuteAssistant = () => {
      muteAudio();
    };

    const handleUnmuteAssistant = () => {
      unmuteAudio();
    };

    const handleConsentProvided = () => {
      console.log("Consent provided");
      // Space for additional logic when consent is provided
    };

    const handleConsentRevoked = () => {
      console.log("Consent revoked");
      // Space for additional logic when consent is revoked
      
      // For example, thank the user, clarify the conversation is over, and then disconnect
      sendAssistantInput("Thank you for your time. The conversation will end now.");

      setTimeout(() => {
        disconnect()
      }, 5000);
    };

    const handleEnterFocusMode = () => {
      console.log("Entering focus mode!");
      // Space for additional logic when entering focus mode
    };

    const handleExitFocusMode = () => {
      console.log("Exiting focus mode!");
      // Space for additional logic when entering focus mode
    }

    messageEmitter.on('pause_assistant', handlePauseAssistant);
    messageEmitter.on('resume_assistant', handleResumeAssistant);
    messageEmitter.on('close_connection', handleCloseConnection);
    messageEmitter.on('mute_assistant', handleMuteAssistant);
    messageEmitter.on('unmute_assistant', handleUnmuteAssistant);
    messageEmitter.on('consent_provided', handleConsentProvided);
    messageEmitter.on('consent_revoked', handleConsentRevoked);
    messageEmitter.on('enter_focus_mode', handleEnterFocusMode);
    messageEmitter.on('exit_focus_mode', handleExitFocusMode);

    return () => {
      messageEmitter.off('pause_assistant', handlePauseAssistant);
      messageEmitter.off('resume_assistant', handleResumeAssistant);
      messageEmitter.off('close_connection', handleCloseConnection);
      messageEmitter.off('mute_assistant', handleMuteAssistant);
      messageEmitter.off('unmute_assistant', handleUnmuteAssistant);
      messageEmitter.off('consent_provided', handleConsentProvided);
      messageEmitter.off('consent_revoked', handleConsentRevoked);
      messageEmitter.off('enter_focus_mode', handleEnterFocusMode);
      messageEmitter.off('exit_focus_mode', handleExitFocusMode);
    };
  }, [sendPauseAssistantMessage, sendResumeAssistantMessage, disconnect, muteAudio, unmuteAudio, sendAssistantInput]);
};
