import express from "express"
import store from "./store.js"
import createRouter from "./router.js"

export default function jsonDB(filePath) {
  const router = express.Router()
  const db = store(filePath)

  ;(async () => {
    await db.init()
  })()

  router.use(express.json())
  router.use(createRouter(db))

  return router
}
