import type { Metadata } from "next";
import "./globals.css";
import { LeadProvider } from "@/context/LeadContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import SchedulerModal from "@/components/SchedulerModal";

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  title: "Vitz.ai | Premium Futuristic Business Growth & Scaling Ecosystem",
  description: "Vitz.ai is a premium, international business growth partner. We launch, build, automate, scale, and grow modern enterprises through advanced technology, marketing, branding, and custom AI systems.",
  keywords: ["Business Growth Ecosystem", "AI Automation", "Web Development", "Premium Branding Agency", "Growth Marketing", "Sales Support Infrastructure"],
  authors: [{ name: "Vitz.ai Team" }],
  robots: "index, follow"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <LeadProvider>
          {/* Background grid overlay */}
          <div className="grid-overlay"></div>
          
          {/* Main sticky navigation */}
          <Navbar />
          
          {/* Main page content container */}
          <main style={{ flex: '1 0 auto', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
            {children}
          </main>
          
          {/* Unified site footer */}
          <Footer />

          {/* Floating conversational bot */}
          <ChatBot />

          {/* Hash-triggered Scheduling System */}
          <SchedulerModal />
        </LeadProvider>
      </body>
    </html>
  );
}
