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
  const headerVariant = Component.header; // default

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header header={headerVariant} />
        <Component key={router.asPath} {...pageProps} />
      </>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            border: "2px solid #0D864C",
            padding: "16px",
            color: "#fff",
            backgroundColor: "#020202",
          },
          iconTheme: { primary: "#0D864C", secondary: "#454545" },
        }}
      />
    </QueryClientProvider>
  );
}
