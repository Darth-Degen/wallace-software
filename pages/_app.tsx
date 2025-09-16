import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Header } from "@components";
import { NextPageWithOptions } from "@types";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppPropsWithOptions = AppProps & { Component: NextPageWithOptions };

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithOptions) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header />
        <Component key={router.asPath} {...pageProps} />
      </>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "1px solid hsl(var(--accent))",
            padding: "10px",
            color: "hsl(var(--foreground))",
            backgroundColor: "hsl(var(--background))",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "hsl(var(--accent))",
            secondary: "hsl(var(--background))",
          },
        }}
      />
    </QueryClientProvider>
  );
}
