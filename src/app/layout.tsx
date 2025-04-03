
import Script from "next/script"
import "@/app/globals.css"

import MainLayout from "@/components/main/MainLayout"

import { Metadata } from "next"
import { AuthProvider } from '@/context/authContext';
export const metadata: Metadata = {
  title: "Amg Wholesale",
  description: "Wholesale Marketplace",
  // icons: "/favicon.png", 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        
        </Providers>
      </body>
    </html>
  )
}



export function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <AuthProvider>
        {children}
      </AuthProvider>
  );
}