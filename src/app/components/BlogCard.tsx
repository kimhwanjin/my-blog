"use client";

import type { Post } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const router = useRouter();
  const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleNavigate = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="block group cursor-pointer"
    >
      <article className="overflow-hidden rounded-2xl border border-slate-800/60 bg-[#161b22]/50 backdrop-blur-sm transition-all duration-300 group-hover:border-slate-700/60 group-hover:shadow-lg group-hover:shadow-emerald-500/5 group-hover:-translate-y-0.5">
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-800/50">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <svg
                className="h-16 w-16 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-md bg-emerald-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-emerald-400">
            {post.title}
          </h3>

          {post.summary && (
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
              {post.summary}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.reading_time_min} min read
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
