'use client';

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; 
  exact?: boolean;           
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      activeClassName,
      pendingClassName: _pending,
      href,
      exact = false,
      children,
      ...props
    },
    ref
  ) => {
    const pathname = usePathname();
    const target =
      typeof href === "string"
        ? href
        : href?.pathname
        ? href.pathname
        : "";

    const isActive = exact
      ? pathname === target
      : pathname === target || pathname.startsWith(String(target) + "/");

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
