import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import "./globals.css";

export default async function RootLayout({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider {...props}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
