import './globals.css';
import { Inter } from 'next/font/google';
import CustomCursor from './../components/ui/CustomCursor';
import { Toaster } from 'react-hot-toast';
import api from "@/utils/api";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export async function generateMetadata() {
  try {
    const res = await api.get("/home-meta");
    const data = await res.json();

    return {
      title: data?.title || "Architylezz -  & Interior Design",
      description: data?.description || "Premium architectural solutions and interior design excellence",
    };
  } catch (err) {
    console.error("Failed to fetch home meta:", err);
    return {
      title: "Architylezz - Luxury Architecture & Interior Design",
      description: "Premium architectural solutions and interior design excellence",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700&f[]=neue-machina@100,200,400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} bg-primary-dark text-white overflow-x-hidden`}>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: "rgba(0,0,0,0.9)",
                border: "1px solid #FFD700",
                color: "#FFD700",
                fontWeight: "600",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
                borderRadius: "12px",
              },
              iconTheme: {
                primary: "#FFD700",
                secondary: "#000",
              },
            },
            error: {
              style: {
                background: "rgba(0,0,0,0.9)",
                border: "1px solid #FF4C4C",
                color: "#FF4C4C",
                fontWeight: "600",
                boxShadow: "0 0 15px rgba(255, 76, 76, 0.5)",
                borderRadius: "12px",
              },
              iconTheme: {
                primary: "#FF4C4C",
                secondary: "#000",
              },
            },
            loading: {
              style: {
                background: "rgba(0,0,0,0.85)",
                border: "1px solid #FFD700",
                color: "#FFD700",
                fontWeight: "600",
                borderRadius: "12px",
              },
            },
          }}
        />
        <main className="relative">
          <CustomCursor/>
          {children}
        </main>
      </body>
    </html>
  );
}