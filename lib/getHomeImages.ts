import fs from "fs"
import path from "path"

const IMG_RE = /\.(png|jpe?g|webp)$/i

export function getHomeImages() {
  const dir = path.join(process.cwd(), "public", "home")
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => IMG_RE.test(f))
    .sort()
    .map((f) => `/home/${f}`)
}
