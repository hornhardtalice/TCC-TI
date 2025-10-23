import type { Metadata } from "next";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripTrack - Explore o Mundo",
  description: "Descubra os melhores destinos com feedbacks de viajantes.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex flex-col min-h-full antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
