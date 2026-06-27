"use client";

import { ThemeProvider } from "next-themes";

if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  window.fetch = async function (url, options = {}) {
    const targetUrl = typeof url === "string" ? url : (url instanceof URL ? url.toString() : "");
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
    
    if (backendUrl && targetUrl.includes(backendUrl)) {
      const token = localStorage.getItem("token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return originalFetch(url, options);
  };
}

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}