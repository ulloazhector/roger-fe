import '@/app/globals.css'
interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html>
            <body>{children}</body>
        </html>
    )
}
