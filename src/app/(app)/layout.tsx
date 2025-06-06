import '../../App.css'
import type { Metadata } from 'next'

 
export const metadata: Metadata = {
  title: 'GKJTU',
  description: 'Website of the gkjtu',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }