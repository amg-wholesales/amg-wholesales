
'use client'

import { usePathname } from "next/navigation"
import Navbar from "@/components/main/Navbar"
import Footer from "@/components/main/Footer"
import { useAuth } from '@/context/authContext'
import "@/app/globals.css"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname()
 

  const showNavbarAndFooter = !pathname?.startsWith("/admin")
                            

 

  return (
    <div className="flex min-h-screen flex-col">
      {showNavbarAndFooter && <Navbar />}
      <div className="flex-1">{children}</div>
      {showNavbarAndFooter && <Footer />}
    </div>
  )
}

export default MainLayout