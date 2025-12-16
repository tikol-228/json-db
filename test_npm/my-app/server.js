import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import jsonDB from "../../src/index.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())

// Mount API under /api, use the app-local db.json
app.use("/api", jsonDB(path.join(__dirname, "db.json")))

// Serve static files from Vite build output (dist)
const distDir = path.join(__dirname, "dist")
app.use(express.static(distDir))

// SPA fallback — serve index.html for all non-API routes without using path-to-regexp
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080")
})
