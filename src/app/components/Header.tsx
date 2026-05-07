"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    }
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-[#0B1120]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 transition-colors group-hover:bg-emerald-500/20">
            <svg
              className="h-4 w-4 text-emerald-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.59 9.41L12 12l-2.59-2.59L8 10.83l4 4 4-4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-wide text-emerald-400">
            DEVPROSE
          </span>
        </Link>

        {/* Search & Auth Navigation */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3.5 py-1.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-700/50 hover:text-white"
            >
              로그아웃
            </button>
          ) : (
            <Link
              href="/auth"
              className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/30"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
