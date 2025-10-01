"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

type ProfileLink = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

interface ProfileDropdownProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  links?: ProfileLink[];
  buttonClassName?: string;
  menuClassName?: string;
}

const defaultLinks: ProfileLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: FiUser },
  { href: "/settings", label: "Settings", icon: FiSettings },
];

export function ProfileDropdown({
  user,
  links = defaultLinks,
  buttonClassName = "flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow hover:border-slate-300 focus:outline-none",
  menuClassName = "absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur z-[100]",
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initial = (user.name ?? user.email ?? "U").charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={buttonClassName}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? user.email ?? "User avatar"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
            {initial}
          </span>
        )}
        <span className="text-sm text-slate-600">
          {user.name ?? user.email ?? "Your account"}
        </span>
        <FiChevronDown
          className={`text-slate-500 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {open ? (
        <div className={menuClassName}>
          <div className="px-3 py-2 text-xs uppercase tracking-wide text-slate-400">
            Account
          </div>
          <div className="flex flex-col text-sm text-slate-700">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {Icon ? <Icon className="text-slate-400" /> : null}
                {label}
              </Link>
            ))}
          </div>
          <div className="my-2 h-px bg-slate-200" />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
          >
            <FiLogOut className="text-lg" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

