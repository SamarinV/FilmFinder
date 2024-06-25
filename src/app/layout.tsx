import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Footer, Header } from "@/common/UI"

const inter = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FilmFinder",
  description: "Ваш личный кинопоиск",
  icons: "./favicon.ico",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
