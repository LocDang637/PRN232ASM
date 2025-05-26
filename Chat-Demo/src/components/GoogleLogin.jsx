// src/components/LoginWithGoogle.jsx
import React from 'react';
import { auth, provider } from '../firebase'; // ✅ Import từ firebase.js
import { signInWithPopup } from 'firebase/auth';

function GoogleLogin() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch("https://localhost:7260/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(idToken),
      });

      const data = await response.json();
      console.log("Token:", data.token);
      console.log("Coach:", data.coach);

      localStorage.setItem("jwt", data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>
        Đăng nhập bằng Google
      </button>
    </div>
  );
}

export default GoogleLogin;
