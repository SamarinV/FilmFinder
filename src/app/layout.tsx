import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.scss"
import { Footer, Header } from "@/common/UI"
import { ToastContainer } from "react-toastify"

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
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</body>
		</html>
	)
}
