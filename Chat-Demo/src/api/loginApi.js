// src/api/loginApi.js
export async function loginWithEmail(email, password) {
  const response = await fetch("https://localhost:7260/api/auth/login-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: email, password: password }) // ⚠️ userName!
  });
    console.log("Body gửi lên:", JSON.stringify({ userName: email, password }));

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return await response.json(); // trả về { token, user }
}
