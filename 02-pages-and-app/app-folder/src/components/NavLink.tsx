"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export function NavLink({
  exact,
  activeClassName = "font-bold text-primary bg-base-400",
  ...props
}: ComponentProps<typeof Link> & {
  exact?: boolean;
  activeClassName?: string;
}) {
  const pathname = decodeURIComponent(usePathname());
  const href = props.href.toString();
  let className = props.className ?? "";
  const isActive =
    href !== "" &&
    ((exact && pathname === href) || (!exact && pathname.startsWith(href)));

  if (isActive) {
    className += " " + activeClassName;
  }


  return <Link {...props} className={className} />;
}
