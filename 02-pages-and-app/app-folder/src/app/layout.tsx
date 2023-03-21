import { NavLink } from "@/components/NavLink";
import Link from "next/link";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className="min-h-screen">
        <nav className="w-56 py-4 bg-base-200 fixed top-0 left-0 bottom-0">
          <Link href="/" className="btn btn-ghost normal-case text-xl mb-10">
            App Router
          </Link>
          <ul className="ml-auto menu">
            <li>
              <NavLink href="/" exact>Dashboard</NavLink>
            </li>
            <li>
              <NavLink href="/accounts">Accounts</NavLink>
            </li>
            <li>
              <NavLink href="/sales">Sales</NavLink>
            </li>
            <li>
              <NavLink href="/expenses">Expenses</NavLink>
            </li>
            <li>
              <NavLink href="/report">Report</NavLink>
            </li>
          </ul>
        </nav>
        <div className="pl-56">{children}</div>
      </body>
    </html>
  );
}
