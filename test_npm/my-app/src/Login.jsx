import { useState, useEffect, useRef } from "react"

export default function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")
  const timer = useRef(null)

  useEffect(() => {
    // don't send when both fields are empty
    if (!login && !password) {
      setStatus("")
      return
    }

    // debounce to avoid spamming the server while typing
    setStatus("Saving...")
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login, password })
        })

        const json = await res.json()
        if (json.error) {
          setStatus(json.error)
        } else {
          setStatus("Saved to db.json ✅")
          console.log("Created/updated user:", json.data)
        }
      } catch (err) {
        setStatus("Network error")
      }
    }, 300)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [login, password])

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

      <p>{status}</p>
    </div>
  )
}
