import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import ConfirmationDialog from "@/components/ConfirmationDialog";

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
            {children}
            <ConfirmationDialog />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
