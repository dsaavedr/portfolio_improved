import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Daniel's Portfolio",
  description:
    "Daniel is a Full-Stack developer, and in his portfolio he showcases some of his personal projects and his love of coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full">
            <div className="mb-5 min-h-screen w-full">
              <Navbar />
              <main>{children}</main>
            </div>
            <Footer />
            <ConfirmationDialog />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
