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

  async function create(collection, data) {
    let db
    try {
      db = await read()
    } catch {
      db = {}
    }

    db[collection] = db[collection] ?? []

    const nextId = db[collection].reduce((max, it) => {
      const maybeId = typeof it?.id === "number" ? it.id : 0
      return Math.max(max, maybeId)
    }, 0) + 1

    const item = { id: nextId, ...data }

    db[collection].push(item)
    await write(db)

    return item
  }

  return {
    init,
    getAll,
    create
  }
}