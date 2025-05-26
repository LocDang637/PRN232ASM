import React from 'react';

function ChatBox({ messages, newMsg, setNewMsg, sendMessage }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hiển thị tin nhắn */}
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Ô nhập tin nhắn */}
      <div style={{ display: 'flex', padding: '1rem', borderTop: '1px solid #ddd' }}>
        <input
          style={{ flex: 1, padding: '8px' }}
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          style={{ padding: '8px 12px', marginLeft: '8px' }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
