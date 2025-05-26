import React from 'react';
import LogoutButton from './LogoutButton';
function Header({ selectedUser }) {
  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
 
      {selectedUser ? `Chat with ${selectedUser}` : 'Select someone to chat'}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <LogoutButton />
      </div>
    </div>
  );
}

export default Header;