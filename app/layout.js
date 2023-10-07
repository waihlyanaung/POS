"use client"
import { usePathname } from "next/navigation";
import { Providers } from "./Global/provider";
import SideBar from "./components/SideBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
          {pathname === '/' ? (
             <div className="flex h-[100vh]">
             <div className="w-full my-5 rounded-lg bg-purple-200 overflow-hidden">
               {children}
             </div>
           </div>
          ) : ( 
            <div className="flex h-[100vh]">
              <div className="w-2/12">
                <SideBar />
              </div>
              <div className="w-10/12 my-5 mr-5 rounded-lg bg-purple-200 overflow-hidden">
                {children}
              </div></div>
          )}
        </Providers>
      </body>
    </html>
  );
}
