import { useState } from "react"

export default function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  const handleLogin = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login,
        password
      })
    })

    const json = await res.json()

    if (json.error) {
      setStatus(json.error)
    } else {
      setStatus("User saved to db.json ✅")
      console.log("Created user:", json.data)
    }
  }

  return (
    <div>
      <input
        placeholder="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>{status}</p>
    </div>
  )
}
