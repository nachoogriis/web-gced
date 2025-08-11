"use server"

import { writeFile } from "fs/promises"

export async function actionSaveFile(text: string) {
  await writeFile("hola.txt", text)
}
