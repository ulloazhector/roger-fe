// import '@/app/globals.css'
import { AppProvider } from '@/app/contexts/AppContext'

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <AppProvider>
            <html>
                <body>{children}</body>
            </html>
        </AppProvider>
    )
}
