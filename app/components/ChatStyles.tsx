export function ChatStyles() {
  return (
    <style jsx global>{`
      .cs-message-list {
        background: transparent !important;
      }

      .cs-message--incoming .cs-message__content {
        background: linear-gradient(
          135deg,
          #f8fafc 0%,
          #e2e8f0 100%
        ) !important;
        border: 1px solid #e2e8f0 !important;
        color: #1e293b !important;
        white-space: pre-line !important;
      }

      .cs-message--outgoing .cs-message__content {
        background: linear-gradient(
          135deg,
          #4f46e5 0%,
          #6366f1 100%
        ) !important;
        border: none !important;
        color: white !important;
      }

      .cs-message-input {
        background: rgba(255, 255, 255, 0.95) !important;
        border-top: 1px solid #e2e8f0 !important;
      }

      .cs-message-input__content-editor {
        color: #1e293b !important;
      }

      .cs-button--send {
        background: linear-gradient(
          135deg,
          #4f46e5 0%,
          #6366f1 100%
        ) !important;
      }

      .cs-typing-indicator {
        background: transparent !important;
      }
    `}</style>
  );
}
