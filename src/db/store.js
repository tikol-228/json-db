import fs from "fs/promises"

export default function store(filePath) {

  async function init() {
    try {
      await fs.access(filePath)
    } catch {
      await fs.writeFile(filePath, JSON.stringify({}, null, 2))
    }
  }

  async function read() {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  }

  async function write(db) {
    await fs.writeFile(filePath, JSON.stringify(db, null, 2))
  }

  async function getAll(collection) {
    try {
      const db = await read()
      return db[collection] ?? []
    } catch {
      return []
    }
  }

  async function getOne(collection, id) {
    try {
      const db = await read()
      const items = db[collection] ?? []
      return items.find(item => item.id === id) ?? null
    } catch {
      return null
    }
  }

  async function create(collection, data) {
    let db
    try {
      db = await read()
    } catch {
      db = {}
    }

    db[collection] ??= []

    const nextId =
      db[collection].reduce((max, it) =>
        typeof it.id === "number" ? Math.max(max, it.id) : max
      , 0) + 1

    const item = { id: nextId, ...data }

    db[collection].push(item)
    await write(db)

    return item
  }

  async function deleteItem(collection, id) {
    try {
      const db = await read()
      const items = db[collection] ?? []

      const index = items.findIndex(item => item.id === id)
      if (index === -1) return false

      items.splice(index, 1)
      db[collection] = items

      await write(db)
      return true
    } catch {
      return false
    }
  }

  async function updateItem(collection, id, data) {
    try {
      const db = await read()
      const items = db[collection] ?? []

      const index = items.findIndex(item => item.id === id)
      if (index === -1) return null

      items[index] = { ...items[index], ...data, id }
      db[collection] = items

      await write(db)
      return items[index]
    } catch {
      return null
    }
  }

  init()

  return {
    init,
    getAll,
    getOne,
    create,
    updateItem,
    deleteItem
  }
}
