import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../styles/globals.scss";
import { logout } from "@/actions/auth";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import UserProvider from "@/contexts/userProvider";
import { getUserLogged } from "@/actions/user";
import UserInfo from "@/components/UserInfo/UserInfo";
import Alert from "@/components/Alert/Alert";
import CartProvider from "@/contexts/CartProvider";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "E commerce",
  description: "The Joaci Faustino's first next project",
  creator: "Joaci Faustino",
  keywords: "e commerce, cake, sweet, delivery, sell",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    images: "/images/open-graph.webp",
    title: "E commerce",
    description: "The Joaci Faustino's first next project"
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <main>
          <UserProvider
            getUserLoggedAction={getUserLogged}
            logoutAction={logout}
          >
            <CartProvider>
              <Alert />

              <Header userInfoComponent={<UserInfo />} />

              {children}

              <Footer />
            </CartProvider>
          </UserProvider>
        </main>
      </body>
    </html>
  );
}
