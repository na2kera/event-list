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

      .cs-sidebar {
        background-color: #f9fafb;
        border-right: 1px solid #e5e7eb;
      }
      .cs-chat-container {
        background-color: #ffffff;
      }

      .cs-message-input {
        background: rgba(255, 255, 255, 0.95) !important;
        border-top: 1px solid #e5e7eb !important;
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

      /* 固定位置の入力フォーム */
      .chat-input-container {
        position: fixed !important;
        bottom: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: calc(100% - 320px) !important; /* サイドバー分を除く */
        max-width: 800px !important;
        z-index: 1000 !important;
        padding: 0 20px !important;
      }

      .chat-input-container .cs-message-input {
        background: rgba(255, 255, 255, 0.98) !important;
        border: 2px solid #e2e8f0 !important;
        border-radius: 16px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1),
          0 4px 10px rgba(0, 0, 0, 0.05) !important;
        backdrop-filter: blur(8px) !important;
        transition: all 0.3s ease !important;
        overflow: hidden !important;
      }

      .chat-input-container .cs-message-input:hover {
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15),
          0 6px 15px rgba(0, 0, 0, 0.08) !important;
        border-color: #c7d2fe !important;
        transform: translateY(-2px) !important;
      }

      .chat-input-container .cs-message-input:focus-within {
        border-color: #6366f1 !important;
        box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15),
          0 6px 15px rgba(99, 102, 241, 0.08) !important;
      }

      .chat-input-container .cs-message-input__content-editor {
        padding: 16px 20px !important;
        font-size: 16px !important;
        color: #1e293b !important;
        background: transparent !important;
        border: none !important;
      }

      .chat-input-container .cs-button--send {
        background: linear-gradient(
          135deg,
          #4f46e5 0%,
          #6366f1 100%
        ) !important;
        border-radius: 12px !important;
        margin: 8px 12px 8px 0 !important;
        padding: 10px 16px !important;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3) !important;
        transition: all 0.2s ease !important;
      }

      .chat-input-container .cs-button--send:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4) !important;
      }

      /* レスポンシブ対応 */
      @media (max-width: 768px) {
        .chat-input-container {
          width: calc(100% - 40px) !important;
          left: 20px !important;
          right: 20px !important;
          transform: none !important;
          bottom: 15px !important;
        }
      }
    `}</style>
  );
}
