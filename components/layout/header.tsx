"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiGithub, FiMenu, FiX, FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "How it works" },
  { href: "#metrics", label: "Metrics" },
  { href: "#testimonials", label: "Proof" },
];

export function Header() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setProfileOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignIn = async () => {
    await signIn("github");
  };

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
  };

  const profileLinks = [
    { href: "/dashboard", label: "Dashboard", icon: FiUser },
    { href: "/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="max-content-width pt-6">
        <div className="glass-panel glow-edge rounded-full px-6 py-4 flex items-center justify-between">
          <Link href="#top" className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-lg shadow-sky-200/60">
              <Image
                src="/logo.png"
                alt="Nimbra logo"
                fill
                className="object-cover"
                sizes="44px"
              />
            </span>
            <span className="text-xl font-semibold tracking-tight text-slate-900">Nimbra</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {status === "authenticated" && session?.user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow hover:border-slate-300 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? session.user.email ?? "User avatar"}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                      {(session.user.name ?? session.user.email ?? "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm text-slate-600">
                    {session.user.name ?? session.user.email}
                  </span>
                  <FiChevronDown className={`text-slate-500 transition-transform ${profileOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                {profileOpen ? (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur">
                    <div className="px-3 py-2 text-xs uppercase tracking-wide text-slate-400">Account</div>
                    <div className="flex flex-col text-sm text-slate-700">
                      {profileLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-100"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Icon className="text-slate-400" />
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
            ) : (
              <Button onClick={handleSignIn} className="gap-2">
                <FiGithub className="text-lg" />
                Sign in with GitHub
              </Button>
            )}
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-800 bg-white/80 shadow"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden glass-panel glow-edge rounded-3xl mt-4 origin-top transition-transform",
            open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-3 px-6 py-4 text-sm text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-2 hover:bg-white/80"
              >
                {link.label}
              </Link>
            ))}
            {status === "authenticated" && session?.user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-slate-700">
                  <span>Signed in as {session.user.name ?? session.user.email}</span>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <Button onClick={handleSignIn} className="mt-2 gap-2">
                <FiGithub className="text-lg" />
                Sign in with GitHub
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
