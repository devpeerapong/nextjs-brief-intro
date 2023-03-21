import type { AppProps } from "next/app";
import { ReactNode } from "react";

export function Layout({ Component, pageProps }: Omit<AppProps, "router">) {
  if (hasLayout(Component)) {
    return Component.getLayout(<Component {...pageProps} />, pageProps);
  }

  return <Component {...pageProps} />;
}

function hasLayout<
  T extends { getLayout(node: ReactNode, pageProps: unknown): JSX.Element }
>(Component: unknown): Component is T {
  return "getLayout" in (Component as any);
}
