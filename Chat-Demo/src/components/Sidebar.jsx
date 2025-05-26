import React, { useState } from 'react';

function Sidebar({ users, onSelectUser }) {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(user =>
    user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ width: '200px', borderRight: '1px solid #ddd', padding: '1rem', background: '#f9f9f9' }}>
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
      />
      {search && (
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '8px' }}>
          {filteredUsers.map((user) => (
            <li
              key={user}
              style={{ padding: '6px', cursor: 'pointer' }}
              onClick={() => {
                onSelectUser(user);
                setSearch('');
              }}
            >
              {user}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
