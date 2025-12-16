import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    if (!login || !password) {
      setStatus("Both fields are required.");
      return;
    }

    setStatus("Saving...");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const json = await res.json();
      if (json.error) {
        setStatus(json.error);
      } else {
        setStatus("Saved to db.json ✅");
        console.log("Created/updated user:", json.data);
        // Очистка полей после успешного сохранения
        setLogin("");
        setPassword("");
      }
    } catch (err) {
      setStatus("Network error");
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <input
        placeholder="login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSave}>Save Data</button> {/* Обработчик нажатия */}

      <p>{status}</p>
    </div>
  );
}
