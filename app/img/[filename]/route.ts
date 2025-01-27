
type Params = {
    params: Promise<{ filename: string }>
}
export async function GET(request: Request, { params }: Params) {
    console.log("Han demanat la imatge", (await params).filename)
    return Response.json({ hola: true })
}