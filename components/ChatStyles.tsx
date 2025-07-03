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
        border: 2px solid #e2e8f0 !important;
        border-radius: 24px !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08) !important;
        backdrop-filter: blur(8px) !important;
        transition: all 0.3s ease !important;
        overflow: hidden !important;
        min-height: 52px !important;
        max-height: 52px !important;
      }

      .cs-message-input:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.16),
          0 4px 12px rgba(0, 0, 0, 0.12) !important;
        border-color: #c7d2fe !important;
        transform: translateY(-1px) !important;
      }

      .cs-message-input:focus-within {
        border-color: #6366f1 !important;
        box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2),
          0 4px 12px rgba(99, 102, 241, 0.12) !important;
      }

      .cs-message-input__content-editor {
        padding: 14px 20px !important;
        font-size: 16px !important;
        line-height: 1.4 !important;
        color: #1e293b !important;
        background: transparent !important;
        border: none !important;
        min-height: 20px !important;
        height: 20px !important;
        display: flex !important;
        align-items: center !important;
      }

      .cs-button--send {
        background: linear-gradient(
          135deg,
          #4f46e5 0%,
          #6366f1 100%
        ) !important;
        border-radius: 16px !important;
        margin: 4px 12px 4px 0 !important;
        padding: 10px 16px !important;
        box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3) !important;
        transition: all 0.2s ease !important;
        min-width: 40px !important;
        height: 40px !important;
      }

      .cs-button--send:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
        background: linear-gradient(
          135deg,
          #4338ca 0%,
          #5b21b6 100%
        ) !important;
      }

      .cs-typing-indicator {
        background: transparent !important;
      }

      /* 固定位置のチャット入力フォーム */
      .fixed-chat-input {
        position: fixed !important;
        bottom: 30px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: calc(100% - 100px) !important; /* 横幅を広げる */
        max-width: 800px !important;
        z-index: 1000 !important;
        padding: 0 20px !important;
      }

      /* レスポンシブ対応 */
      @media (max-width: 768px) {
        .cs-message-input {
          border-radius: 12px !important;
        }

        .fixed-chat-input {
          left: 20px !important;
          right: 20px !important;
          transform: none !important;
          width: calc(100% - 40px) !important;
          padding: 0 !important;
        }
      }
    `}</style>
  );
}
