import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar/Sidebar'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Печи / Насосы',
	description: 'Информация о печах / насосах',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={`${geistSans.variable} ${geistMono.variable} antialiased p-0  m-0`}
		>
			<body className='flex h-screen bg-[#C0C0C0]'>
				<Sidebar />
				{children}
			</body>
		</html>
	)
}
