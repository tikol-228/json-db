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

    try {
      const item = await db.create(collection, data)
      return res.status(201).json({ message: 'Created', data: item })
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create item' })
    }
  })

  return router
}
