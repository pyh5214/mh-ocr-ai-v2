"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

const navItems = [
  { href: "/files", label: "파일 관리" },
  { href: "/analytics", label: "통계" },
  { href: "/settings/history", label: "세팅" },
];

const secondaryNavItems = [
  { href: "#", label: "MH Vector AI" },
  { href: "#", label: "MH Ontology AI" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[6px] bg-[rgba(255,255,255,0.8)] border-b border-[#f3f4f6]">
      <div className="h-20 px-10 flex items-center justify-between">
        {/* Left section: Logo + Navigation */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#137fec] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center">
              <Image
                src="/icons/logo-icon.png"
                alt="MH OCR AI"
                width={18}
                height={18}
              />
            </div>
            <span className="font-bold text-lg text-[#111827]">MH OCR AI</span>
          </Link>

          {/* Primary Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive
                      ? "text-[#137fec] bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right section: Secondary Nav + User */}
        <div className="flex items-center gap-6">
          {/* Secondary Navigation */}
          <nav className="flex items-center gap-2">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Divider + User */}
          <div className="flex items-center gap-4 pl-6 border-l border-[#f3f4f6]">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Alex Chen</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border border-[#e5e7eb] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
