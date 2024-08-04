import { EventEmitter } from 'events';

interface MessageEvents {
  'pause_assistant': () => void;
  'resume_assistant': () => void;
  'close_connection': () => void;
  'mute_assistant': () => void;
  'unmute_assistant': () => void;
  'consent_provided': () => void;
  'consent_revoked': () => void;
  'enter_focus_mode': () => void;
  'exit_focus_mode': () => void;
}

class TypedEventEmitter extends EventEmitter {
  on<K extends keyof MessageEvents>(event: K, listener: MessageEvents[K]): this {
    return super.on(event, listener);
  }

  off<K extends keyof MessageEvents>(event: K, listener: MessageEvents[K]): this {
    return super.off(event, listener);
  }

  emit<K extends keyof MessageEvents>(event: K, ...args: Parameters<MessageEvents[K]>): boolean {
    return super.emit(event, ...args);
  }
}

const messageEmitter = new TypedEventEmitter();
export default messageEmitter;
