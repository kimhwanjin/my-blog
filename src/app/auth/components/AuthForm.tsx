"use client";

import { useState } from "react";
import { login, signup, resetPassword } from "../actions";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    let result;

    if (mode === "login") {
      result = await login(formData);
    } else if (mode === "signup") {
      result = await signup(formData);
    } else if (mode === "forgot") {
      result = await resetPassword(formData);
    }

    if (result && "error" in result && result.error) {
      setError(result.error);
    } else if (result && "success" in result && result.success) {
      setSuccess(result.success);
    }
    
    setIsLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-xl border border-slate-800 bg-[#161b22]/50 backdrop-blur-xl shadow-2xl">
      <form action={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg">
            {success}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-[#0d1117] text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="engineer@devprose.com"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setMode("forgot")}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300 focus:outline-none"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-[#0d1117] text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-slate-900 bg-[#4ade80] hover:bg-[#3bce71] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : mode === "login" ? (
            <>
              Sign In <span className="ml-2">→</span>
            </>
          ) : mode === "signup" ? (
            <>
              Sign Up <span className="ml-2">→</span>
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="font-medium text-emerald-400 hover:text-emerald-300"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}
