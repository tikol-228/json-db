import { Router } from "express"

export default function createRouter(db) {
  const router = Router()

  // GET
  router.get("/:collection", async (req, res) => {
    const { collection } = req.params
    const items = await db.getAll(collection)
    res.json(items)
  })

  // POST
  router.post("/:collection", async (req, res) => {
    const { collection } = req.params
    const data = req.body

    if (!data) {
      return res.status(400).json({ error: "No data provided" })
    }

    await db.create(collection, data)

    res.status(201).json({
      message: "Created",
      data
    })
  })

  return router
}
