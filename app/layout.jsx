import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RiUserReceived2Line } from "react-icons/ri";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Footer from "./Foot";
import {NavBar} from "./NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "个人博客 - Create Next App",
  description: "基于 Next.js 构建的响应式个人博客",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
          <div className="bg-[url('/grid-black.svg')] bg-repeat min-h-screen">
            {/* 用户登录按钮 - 响应式定位 */}
            <div className="fixed top-4 right-4 z-50 text-2xl md:text-3xl text-[#003877]">
              <SignedOut>
                <SignUpButton>
                  <RiUserReceived2Line style={{color:'black'}}>
                    login
                  </RiUserReceived2Line>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            
            {/* 导航栏 */}
            <NavBar/>
            
            {/* 主内容区域 */}
            <main className="flex-1 w-full px-4 md:w-[90vw] md:mx-auto">
              {children}
            </main>
            
            {/* 页脚 */}
            <footer className='w-full px-4 md:w-[90vw] md:mx-auto'>
              <div className="pt-4 bg-white">
                <hr className="mb-6"/>
                <Footer/>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
