"use client"

import { actionSaveFile } from "@/actions/save-file"
import { Button } from "./ui/button"

export default function ActionButton() {
  async function saveFile() {
    await actionSaveFile("👉🏻 This will be the content of the file 😋")
  }

  return <Button onClick={saveFile}>Click me!!!!!!!</Button>
}
