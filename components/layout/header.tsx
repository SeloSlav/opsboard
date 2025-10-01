"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { ProfileDropdown } from "@/components/auth/profile-dropdown";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "How it works" },
  { href: "#metrics", label: "Metrics" },
  { href: "#testimonials", label: "Proof" },
];

type HeaderProps = {
  hideNavLinks?: boolean;
};

export function Header({ hideNavLinks = false }: HeaderProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
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

  const handleSignIn = async () => {
    await signIn("github");
  };

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

          {!hideNavLinks ? (
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
          ) : (
            <span className="hidden md:block" />
          )}

          <div className="hidden md:flex items-center gap-3">
            {status === "authenticated" && session?.user ? (
              <ProfileDropdown user={session.user} />
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

        {!hideNavLinks ? (
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
                <ProfileDropdown
                  user={session.user}
                  buttonClassName="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-2"
                  menuClassName="absolute inset-x-0 bottom-0 translate-y-full rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur"
                />
              ) : (
                <Button onClick={handleSignIn} className="mt-2 gap-2">
                  <FiGithub className="text-lg" />
                  Sign in with GitHub
                </Button>
              )}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
