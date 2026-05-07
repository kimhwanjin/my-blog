import AuthForm from "./components/AuthForm";

export const metadata = {
  title: "Authenticate | DevProse",
  description: "Authenticate to access the collective.",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex flex-col items-center justify-center p-4">
      {/* Background gradients/blobs simulating the mockup */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Logo Icon */}
        <div className="mb-4 flex items-center justify-center w-14 h-14 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg">
          <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8.5 11.5l-5-5 1.41-1.41L11.5 12l-3.59 3.59-1.41-1.41zm6 1.41L16.09 17 12 12.91 16.09 8.82 17.5 10.23 14.83 12.91l2.67 2.68z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          DevProse
        </h1>
        <p className="text-slate-400 mb-8 text-center">
          Authenticate to access the collective.
        </p>

        {/* Form Component */}
        <AuthForm />
      </div>
    </div>
  );
}
