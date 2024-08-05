<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>EVI Example: Public Speaking Assistant</h1>
</div>

<div align="center">
  <img src="preview.png" width="463" height="683">
</div>

## Overview

This project features a sample implementation of Hume's [Empathic Voice Interface](https://hume.docs.buildwithfern.com/docs/empathic-voice-interface-evi/overview) using Hume's React SDK.

## Support

If you have questions, require assistance, or wish to engage in discussions pertaining to this starter template, [please reach out to us on Discord](https://link.hume.ai/discord).

## Feature Implementations

### Voice Commands via Tool Use and Message Emitter

(explaining how tools are used to interact with the assistant and a message emitter is used to resume it)

### Resumability

Resumability is achieved by managing the chat group ID state and updating it upon receiving specific WebSocket messages. The chat group ID is also stored in the browser's [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to preserve its value across sessions.

Here’s a step-by-step breakdown:

1. **State Initialization**: The `chatGroupId` state is initialized to `undefined`.
  ```js
  // Chat.tsx
  const [chatGroupId, setChatGroupId] = useState<string | undefined>(undefined);
  ```
2. **Handling WebSocket Messages**: When a message is received, the `onMessage` function checks for `chat_metadata` type messages and updates the state with the new chat group ID.
  ```js
  // Chat.tsx
  onMessage={(message) => {
    if (message.type === "chat_metadata") {
      setChatGroupId(message.chat_group_id);
      localStorage.setItem('chatGroupId', message.chat_group_id);
    }
  }}
  ```
3. **State Update and Re-render**: Calling `setChatGroupId` updates the state, causing React to re-render the component with the new chat group ID.
4. **Passing the Updated Value**: The updated `chatGroupId` is passed to the VoiceProvider component via its `resumedChatGroupId` prop. This ensures that the chat session can be resumed with the correct chat group ID whenever a new one is received.
  ```js
  // Chat.tsx
  <VoiceProvider
    resumedChatGroupId={chatGroupId}
    // ... other props
  >
  ```
#### Resetting the chat group ID
Clear the local storage to reset the chat group ID. In most browsers, this can be done via the Developer Tools under a "Storage" tab.

## Image Attribution
<a href="https://www.freepik.com/free-photo/white-paper-texture_1033849.htm#query=paper%20texture&position=30&from_view=keyword&track=ais_hybrid&uuid=d40bacf0-567c-4d14-bb2b-f7cf692e926b">Image by kues1</a> on Freepik

<a href="https://www.freepik.com/free-vector/hand-drawn-mic-drawing-illustration_82457356.htm#fromView=search&page=1&position=31&uuid=73138e02-1f4e-459e-9b7a-02fa4326c889">Image by freepik</a>

Icons:
- https://www.svgrepo.com/svg/44827/microphone-drawing
- https://www.svgrepo.com/svg/112390/delete-hand-drawn-cross-symbol-outline
- https://www.svgrepo.com/svg/2030/arrow-point-hand-drawn-outline-pointing-to-right-direction
- https://www.svgrepo.com/svg/452661/robot-neutral
- https://www.svgrepo.com/svg/452535/superhero-standing
- https://www.svgrepo.com/svg/452438/agreement