import { NavLink } from "@/components/NavLink";

import type { ReactNode } from "react";

export default function SalesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="p-8">
      <h4 className="text-5xl font-bold mb-8">Sales</h4>
      <div className="tabs w-full">
        <NavLink
          href="/sales"
          exact
          activeClassName="tab-active"
          className="tab tab-lg tab-lifted"
        >
          Overview
        </NavLink>
        <NavLink
          href=""
          activeClassName="tab-active"
          className="tab tab-lg tab-lifted"
        >
          Subscriptions
        </NavLink>
        <NavLink
          href="/sales/invoices"
          activeClassName="tab-active"
          className="tab tab-lg tab-lifted"
        >
          Invoices
        </NavLink>
        <NavLink
          href=""
          activeClassName="tab-active"
          className="tab tab-lg tab-lifted"
        >
          Customers
        </NavLink>
        <NavLink
          href=""
          activeClassName="tab-active"
          className="tab tab-lg tab-lifted"
        >
          Deposits
        </NavLink>
        <span className="tab tab-lg tab-lifted flex-grow cursor-default"></span>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
