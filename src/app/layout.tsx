import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";
import "@/styles/mediconnect.css";

export const metadata: Metadata = {
  title: {
    default: "MediConnect Malaysia",
    template: "%s | MediConnect Malaysia",
  },
  description:
    "Explore medical care in Malaysia with appointment, travel and stay coordination from Bangladesh. MediConnect design preview.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#edf5f8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
