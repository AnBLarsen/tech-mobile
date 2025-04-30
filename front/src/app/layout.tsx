import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import { Noto_Sans, Source_Sans_3 } from 'next/font/google'
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "../context/CartContext";


const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
})



export const metadata: Metadata = {
  title: "Tech Mobile",
  description: "Get the best of Google products",
  icons: {
    icon: "/Icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${sourceSans.variable}`}>
      <body className="bg-gray-200 min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <UserProvider>
          <CartProvider>
            <NavBar />
              <main className="flex-1">
                {children}
              </main>
            <Footer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
