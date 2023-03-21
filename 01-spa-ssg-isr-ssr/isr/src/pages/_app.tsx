import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div className="navbar bg-base-100 text-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">Incremental Site Regeneration (ISR)</Link>
      </div>
      <Component {...pageProps} />
    </div>
  );
}
