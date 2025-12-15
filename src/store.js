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
    const db = await read()

    db[collection] = db[collection] ?? []

    const id =
      db[collection].length > 0
        ? db[collection][db[collection].length - 1].id + 1
        : 1

    const item = { id, ...data }

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