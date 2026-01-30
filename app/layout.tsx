import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./header"
import Footer from "./footer"

export const dynamic = "force-static"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// })
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// })

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GCED",
  description: "Grau en Ciència i Enginyeria de Dades",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
