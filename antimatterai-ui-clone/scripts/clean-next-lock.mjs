import fs from "node:fs"
import path from "node:path"

const lockPath = path.join(process.cwd(), ".next", "dev", "lock")

try {
  fs.rmSync(lockPath, { force: true })
} catch {
  // ignore
}

