import { Figtree } from "next/font/google";
import { DM_Serif_Text } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif-text",
});

export const metadata = {
  title: "Mamiko",
  description: "Mom's Best Choice",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} ${dmSerifText.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
