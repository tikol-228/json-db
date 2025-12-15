import express from "express"
import jsonDB from "../../src/index.js"

const app = express()

app.use(express.json())

app.use("/api", jsonDB("db.json"))

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080")
})
