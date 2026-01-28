import fs from "fs"
import path from "path"

const IMG_RE = /\.(png|jpe?g|svg|webp)$/i

export function getPublicLogos(folder: "job_logos" | "internship_logos") {
  const dir = path.join(process.cwd(), "public", folder)

  // si no existe la carpeta, devuelve vacío
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => IMG_RE.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => `/${folder}/${f}`)
}
