import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';

function ChatPage() {
  const users = ['Alice', 'Bob', 'Charlie', 'David'];
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  function sendMessage() {
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: newMsg }]);
    setNewMsg('');
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar users={users} onSelectUser={setSelectedUser} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header selectedUser={selectedUser} />
        {selectedUser && (
          <ChatBox
            messages={messages}
            newMsg={newMsg}
            setNewMsg={setNewMsg}
            sendMessage={sendMessage}
          />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
